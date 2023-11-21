import { useEffect, useState } from "react";

let colorArray = ['#419EBB', '#EDA249', '#6D2ED5', '#D14C32', '#D83A34', '#CD5120', '#1EC1A2', '#2D68F0'];
let sizeArray = ['45%', '50%', '55%', '47%', '90%', '85%', '60%', '60%']

interface ContentProps {
    planet: number;
    data: [] | null;
    page: string;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    image: string;
    setImage: React.Dispatch<React.SetStateAction<string>>;
    mobile: boolean;
    setMobile: React.Dispatch<React.SetStateAction<boolean>>;
    bodyHide: boolean;
}

const Content: React.FC<ContentProps> = ({ planet, data, page, setPage, image, setImage, mobile, setMobile, bodyHide }) => {
    const pagesArray = ['overview', 'internal structure', 'surface geology'];
    const imagesArray = ['planet', 'internal', 'geology'];
    const [selectCount, setSelectCount] = useState<number>(0) // ვიგებთ დაეკლიკა თუ არა რომელიმე .pages ელემენტს

    useEffect(() => {
        // აქ ვადგენთ მობაილ ვერსიაზე ვართ თუ არა და შესაბამისად ვცვლით mobile სთეითს
        const handleResize = () => {
            setMobile(window.innerWidth <= 430);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
    })

    return (
        <main style={!mobile ? {} : bodyHide ? { display: 'none' } : {}}>
            <div className='img_div'>
                <img
                    className="planet_img"
                    style={{ width: sizeArray[planet], height: sizeArray[planet] }}
                    src={(data && image == 'internal')
                        ? data[planet]['images']['internal']
                        : (data
                            ? data[planet]['images']['planet']
                            : '')}
                    alt=""
                />
                {(data && image == 'geology')
                    ? <img
                        className='geology'
                        src={data[planet]['images']['geology']}
                        alt="" />
                    : null
                }
            </div>
            <div className='content'>
                <div className="content_left">
                    <h2>{data ? data[planet]['name'] : ''}</h2>
                    <p className='content_text'>{data ? data[planet][page]['content'] : ''}</p>
                    <p className='source'>Source: <a className='wiki' href={data ? data[planet][page]['source'] : ''} target='_blank'>Wikipedia</a></p>
                </div>
                <div className="content_right">
                    {pagesArray.map((element, index) => (
                        <div
                            style={(!mobile && element.includes(page))
                                ? { backgroundColor: colorArray[planet], borderColor: 'transparent' }
                                : mobile && element.includes(page)
                                    ? { borderColor: colorArray[planet], backgroundColor: 'transparent' }
                                    : !mobile && !element.includes(page)
                                        ? { borderColor: '#393950', backgroundColor: 'transparent' }
                                        : { borderColor: 'transparent', backgroundColor: 'transparent' }
                            }
                            className='pages'
                            key={index}
                            onClick={() => {
                                setPage(element.split(' ')[element.split(' ').length - 1]);
                                setImage(imagesArray[index]);
                                setSelectCount(selectCount + 1);
                            }}
                        >
                            <span
                                style={element.includes(page)
                                    ? { color: '#a0cfdd' }
                                    : {}}
                            >{!mobile
                                ? '0' + (index + 1)
                                : ''}
                            </span>
                            {!mobile
                                ? element
                                : element === 'surface geology'
                                    ? 'surface'
                                    : element.split(' ')[element.split(' ').length - 1]
                            }
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}

export default Content;