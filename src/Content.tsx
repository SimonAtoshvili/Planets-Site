import { useEffect, useState } from "react";

let colorArray = ['#419EBB', '#EDA249', '#6D2ED5', '#D14C32', '#D83A34', '#CD5120', '#1EC1A2', '#2D68F0'];

function Content(props: any) {
    const pagesArray = ['overview', 'internal structure', 'surface geology'];
    const imagesArray = ['planet', 'internal', 'geology'];
    const [selectCount, setSelectCount] = useState<number>(0) // ვიგებთ დაეკლიკა თუ არა რომელიმე .pages ელემენტს

    useEffect(() => { 
        // აქ ვადგენთ მობაილ ვერსიაზე ვართ თუ არა, იმის საფუძველზე, ჩანს თუ არა burger icon და შესაბამისად ვცვლით mobile სთეითს
        const burgerDisplayStyle = window.getComputedStyle(props.burgerRef.current).getPropertyValue('display');
        if (props.burgerRef.current) {
            if (burgerDisplayStyle === 'none') {
                props.setMobile(false);
            } else {
                props.setMobile(true);
            }
        }
    }, [selectCount, props.planet, props.burgerRef.current])

    return (
        <main style={props.bodyHide ? {display: 'none'} : {}}>
            <div className='img_div'>
                <img
                    className="planet_img"
                    src={(props.data && props.image == 'internal')
                        ? props.data[props.planet].images.internal
                        : (props.data
                            ? props.data[props.planet].images.planet
                            : '')}
                    alt=""
                />
                {(props.data && props.image == 'geology')
                    ? <img
                        className='geology'
                        src={props.data[props.planet].images.geology}
                        alt="" />
                    : null
                }
            </div>
            <div className='content'>
                <div className="content_left">
                    <h2>{props.data ? props.data[props.planet].name : ''}</h2>
                    <p className='content_text'>{props.data ? props.data[props.planet][props.page].content : ''}</p>
                    <p className='source'>Source: <a className='wiki' href={props.data ? props.data[props.planet][props.page].source : ''} target='_blank'>Wikipedia</a></p>
                </div>
                <div className="content_right">
                    {pagesArray.map((element, index) => (
                        <div
                            style={(!props.mobile && element.includes(props.page))
                                ? { backgroundColor: colorArray[props.planet], borderColor: 'transparent' }
                                : props.mobile && element.includes(props.page)
                                    ? { borderColor: colorArray[props.planet], backgroundColor: 'transparent' }
                                    : !props.mobile && !element.includes(props.page)
                                        ? { borderColor: '#393950', backgroundColor: 'transparent' }
                                        : { borderColor: 'transparent', backgroundColor: 'transparent' }
                            }
                            className='pages'
                            key={index}
                            onClick={() => {
                                props.setPage(element.split(' ')[element.split(' ').length - 1]);
                                props.setImage(imagesArray[index]);
                                setSelectCount(selectCount + 1);
                            }}
                        >
                            <span
                                style={element.includes(props.page)
                                    ? { color: '#a0cfdd' }
                                    : {}}
                            >{!props.mobile
                                ? '0' + (index + 1)
                                : ''}
                            </span>
                            {!props.mobile
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