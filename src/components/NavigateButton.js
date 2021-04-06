import React from 'react'
import { Link } from 'react-router-dom'

const NavigateButton = () => {
    return (
        <Link 
            to="/"
            style={{"textDecoration": "none", "display": "flex", "alignItems": "center"}}
        >
            <img 
                src="assets/left.png"
                style={{"height": "25px", "width": "25px", "margin": "5px"}}
                alt="BackButton"
            />
            <p style={{"marginRight": "20px", "color": "black", "fontWeight": "bold"}}>Zurück</p>
        </Link>
    )
}

export default NavigateButton
