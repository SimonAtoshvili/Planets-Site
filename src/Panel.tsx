import { useState } from "react";

let planetsArray = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
let colorArray = ['#419EBB', '#EDA249', '#6D2ED5', '#D14C32', '#D83A34', '#CD5120', '#1EC1A2', '#2D68F0']

interface PanelProps {
    data: [] | null;
    planet: number;
    setPlanet: React.Dispatch<React.SetStateAction<number>>;
    setPage: React.Dispatch<React.SetStateAction<string>>;
    setImage: React.Dispatch<React.SetStateAction<string>>;
    mobile: boolean;
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Panel: React.FC<PanelProps> = ({ data, planet, setPlanet, setPage, setImage, mobile, count, setCount }) => {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null) // ვიგებთ რომელ პლანეტის სახელს გადავატარეთ მაუსი, რომ შესაბამისი ფერი მისცეს
    const [hover, setHover] = useState<boolean>(false) // ვიგებთ The Planets(სათაურს) თუ გადავატარეთ მაუსი, რათა გავაფერადოთ არჩეული პლანეტის ფრად
    const [burger, setBurger] = useState<boolean>(true); // რა ფერი უნდა იყოს burger icon

    const ul = document.querySelector('ul')

    return (
        <header>
            <a href="../index.html">
                <h1
                    onMouseOver={() => setHover(true)}
                    onMouseOut={() => setHover(false)}
                    style={hover ? { color: colorArray[planet] } : {}}
                >
                    The Planets</h1>
            </a>
            <ul>
                {planetsArray.map((element, index) => (
                    <li
                        key={index}
                        style={!mobile && hoveredIndex === index ? { borderColor: colorArray[index] } : {}}
                        onMouseOver={() => setHoveredIndex(index)}
                        onMouseOut={() => setHoveredIndex(null)}
                        onClick={() => {
                            setPlanet(index);
                            setPage('overview');
                            setImage('planet');
                            if (mobile) {
                                setCount(count + 1)
                                setBurger(!burger)
                                ul?.classList.toggle('ul_show');
                            }
                        }}
                    >
                        <img
                            className="mobile_images"
                            src={data ? data[index]['images']['planet'] : ''}
                            alt=""
                        />
                        {element}
                        <svg className="mobile_svg" xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                            <path opacity="0.4" d="M1 1L5 5L1 9" stroke="white" />
                        </svg>
                    </li>
                ))}
            </ul>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="17" viewBox="0 0 24 17"
                fill="none"
                className="burger"
                onClick={() => {
                    if (mobile) {
                        setCount(count + 1)
                        setBurger(!burger)
                        ul?.classList.toggle('ul_show');
                    }
                }}
            >
                <rect width="24" height="3" fill={burger ? 'white' : "#45455a"} />
                <rect y="7" width="24" height="3" fill={burger ? 'white' : "#45455a"} />
                <rect y="14" width="24" height="3" fill={burger ? 'white' : "#45455a"} />
            </svg>
        </header>
    )
}

export default Panel;