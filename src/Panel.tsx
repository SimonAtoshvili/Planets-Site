import { useState } from "react";

let planetsArray = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
let colorArray = ['#419EBB', '#EDA249', '#6D2ED5', '#D14C32', '#D83A34', '#CD5120', '#1EC1A2', '#2D68F0']

function Panel(props: any) {

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null) // ვიგებთ რომელ პლანეტას გადავატარეთ მაუსი, რომ შესაბამისი ფერი მისცეს
    const [hover, setHover] = useState<boolean>(false) // ვიგებთ The Planets(სათაურს) თუ გადავატარეთ მაუსი, რათა გავაფერადოთ არჩეული პლანეტის ფრად
    const [burger, setBurger] = useState<boolean>(true); // რა ფერი უნდა იყოს burger icon

    return (
        <header>
            <a href="../index.html">
                <h1
                    onMouseOver={() => setHover(true)}
                    onMouseOut={() => setHover(false)}
                    style={hover ? { color: colorArray[props.planet] } : {}}
                >
                    The Planets</h1>
            </a>
            <ul style={props.bodyHide ? {display: 'flex'} : {display: 'none'}}>
                {planetsArray.map((element, index) => (
                    <li
                        key={index}
                        style={props.mobile && hoveredIndex === index ? { borderColor: colorArray[index] } : {}}
                        onMouseOver={() => setHoveredIndex(index)}
                        onMouseOut={() => setHoveredIndex(null)}
                        onClick={() => {
                            props.setPlanet(index);
                            props.setPage('overview');
                            props.setImage('planet');
                            if (props.mobile) {
                                props.setCount(props.count + 1)
                                if(burger) {
                                    setBurger(false);
                                }else {
                                    setBurger(true);
                                }
                            }
                        }}
                    >
                        <img
                            className="mobile_images"
                            src={props.data ? props.data[index].images.planet : ''}
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
                ref={props.burgerRef}
                onClick={() => {
                    if (props.mobile) {
                        props.setCount(props.count + 1)
                        if(burger) {
                            setBurger(false);
                        }else {
                            setBurger(true);
                        }
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