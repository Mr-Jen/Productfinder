import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const linkStyle = {
    textDecoration: "none",
    display: "flex",
    alignItems: "center"
}

/*const Icon = styled.img`
    order: ${props => props.direction === "right" && "1"};
`*/

const Text = styled.p`
    marginRight: ${props => props.direction === "left" && "20px"};
    @media (max-width: 450px) {
        display: none;
    }
    color: black;
`

const NavigateButton = (props) => {
    const [toggle, setToggle] = React.useState(false);

    React.useEffect(() => {
        console.log("TOGGLE: ", toggle);
    }, [toggle])

    return (
        <Link 
            to={props.location}
            style={linkStyle}
            onClick={props.onClick && props.onClick}
            onMouseEnter={() => setToggle(true)}
            onMouseLeave={() => setToggle(false)}
        >
            {/*<Icon 
                src={props.direction === "left" ? (toggle ? "assets/icons/misc/left-grey.png" : "/assets/icons/misc/left.png") : "/assets/icons/misc/right.png"}
                alt="BackButton"
                direction={props.direction}
                style={{"height": "25px", "width": "25px", "margin": "5px"}}
            />*/}
            <svg xmlns="http://www.w3.org/2000/svg" style={{stroke: toggle ? "grey" : "black", width: "20px", margin: "5px"}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <Text 
                style={{ "fontWeight": "bold", "color": toggle ? "grey" : "black"}}
                direction={props.direction}
            >
                {props.text}
            </Text>
        </Link>
    )
}

export default NavigateButton
