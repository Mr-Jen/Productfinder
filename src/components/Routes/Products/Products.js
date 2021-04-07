import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const itemStyle = {
    "display": "flex",
    "justifyContent": "center",
    "alignItems": "center",
    "border": "1px solid black", 
    "margin": "10px",
    "padding": "5px",
    "height": "80px",
    "width": "80px"
}

const itemTextStyle = {
    "fontWeight": "bold"
}

const Products = (props) => {
    return (
        <Wrapper>
            {
                [...Array(5)].map((x, i) => {
                    return <div style={itemStyle} key={i}>
                        <p style={itemTextStyle}>{`Item ${i}`}</p>
                    </div>
                })
            }
        </Wrapper>
    )
}


export default connect()(Products)
