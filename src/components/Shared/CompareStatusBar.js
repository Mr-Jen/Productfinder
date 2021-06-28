import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: white;
    height: 6em;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

const linkStyling = {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    textDecoration: 'none',
    height: '25px',
    width: '60%',
    alignItems: 'center',
    backgroundColor: `${props => props.disabled ? '#ffe60a' : 'black'}`,
    border: '1px solid black',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '7px',
    marginBottom: '10px',
    marginTop: '10px'
}  

const ButtonText = styled.p`
    margin-right: 10px;
    color: black;
    font-weight: bold;
    font-size 14px;
`

const CompareStatusBar = ({ compareLength, compareList, resetCompare }) => {
    let productParams = compareList.join('+')
    console.log("IS DISABLED?: ", compareList.length < 2)
    return (
        <Wrapper>
            <button  onClick={() => resetCompare()}>Alle löschen</button>
            <Link 
                    to={`/compare/${productParams}`}
                    style={linkStyling}
                    disabled={compareList.length < 2}
            >
                <ButtonText>{`Produkte vergleichen (${compareList.length} / ${compareLength})`}</ButtonText>
                <img 
                    src="assets/icons/misc/right.png"
                    style={{"height": "20px", "width": "20px", "margin": "5px"}}
                    alt="BackButton"
                />
            </Link>
        </Wrapper>
    )
}

export default CompareStatusBar
