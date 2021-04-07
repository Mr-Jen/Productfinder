import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const linkStyle = {
    textDecoration: "none",
    display: "flex",
    alignItems: "center"
}

const Icon = styled.img`
    order: ${props => props.direction === "right" && "1"};
`

const Text = styled.p`
    marginRight: ${props => props.direction === "left" && "20px"};
`


const NavigateButton = (props) => {
    return (
        <Link 
            to={props.location}
            style={linkStyle}
        >
            <Icon 
                src={props.direction === "left" ? "assets/left.png" : "assets/right.png"}
                alt="BackButton"
                direction={props.direction}
                style={{"height": "25px", "width": "25px", "margin": "5px"}}
            />
            <Text 
                style={{"color": "black", "fontWeight": "bold"}}
                direction={props.direction}
            >{props.text}</Text>
        </Link>
    )
}

export default NavigateButton
