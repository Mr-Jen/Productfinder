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

const DeleteButton = styled.button`
    height: 3em;
    border: none;
    background-color: white;
    font-weight: bold;
    font-size: 1em;
    text-decoration: underline;
    cursor: pointer;

    @media (max-width: 400px) {
        font-size: .9em;
    }
`

const ButtonText = styled.p`
    margin-right: 10px;
    color: white;
    font-weight: bold;
    font-size 3.5vw;
    @media screen and (min-width: 440px) {
        font-size: 14px;
    }
`

const Icon = styled.img`
    -webkit-filter: invert(100%);
`

const CompareStatusBar = ({ compareLength, compareList, resetCompare }) => {
    let productParams = compareList.join('&')
    const disabled = compareList.length < 2;

    const linkStyling = {
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        textDecoration: 'none',
        height: '2.5em',
        maxWidth: '60%',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingRight: '10px',
        borderRadius: '7px',
        border: 'none',
        marginBottom: '10px',
        marginTop: '10px',
        backgroundColor: disabled ? 'rgb(223, 223, 223)' : 'black',
        //pointerEvents: disabled ? 'none' : 'auto',
        cursor: disabled ? 'not-allowed' : 'pointer'
    }  
    
    return (
        <Wrapper>
            <DeleteButton onClick={() => resetCompare()}>Alle löschen</DeleteButton>
            {
                disabled ?
                    <button style={linkStyling} onClick={() => alert("Bitte wählen Sie für den Vergleich zwei Produkte aus.")} disabled={false}>
                        <ButtonText disabled>{`Produkte vergleichen (${compareList.length} / ${compareLength})`}</ButtonText>
                        <Icon 
                            src="assets/icons/misc/right.png"
                            style={{"height": "20px", "width": "20px", "margin": "5px"}}
                            alt="BackButton"
                        />
                    </button>
                :
                    <Link 
                        to={`/compare/${productParams}`}
                        style={linkStyling}
                        onClick={() => console.log("VERGLEICHEN")}
                    >
                        <ButtonText disabled>{`Produkte vergleichen (${compareList.length} / ${compareLength})`}</ButtonText>
                        <Icon 
                            src="assets/icons/misc/right.png"
                            style={{"height": "20px", "width": "20px", "margin": "5px"}}
                            alt="BackButton"
                        />
                    </Link>
            }
        </Wrapper>
    )
}

export default CompareStatusBar
