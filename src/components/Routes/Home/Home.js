import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addToHistory } from '../../../actions/history';
import './home.css';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 625px) {
        flex-direction: column;
        align-items: center;
    }
    justify-content: center;
    margin-top: 10vh;
    align-items: center;
`

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 40%;
    @media (max-width: 625px) {
        width: 90%;
        margin-top: 1em;
    }
`

const HomeIcon = styled.img`
    display: flex;
    align-self: center;
    width: 30%;
    max-width: 200px;
    margin-right: 20%;
    @media (max-width: 625px) {
        margin-right: 0;
    }
`
const TitleText = styled.h2`
    line-height: 1.4;
`

const InfoText = styled.p`
    color: grey;
    font-size: 18px;
    line-height: 1.6;
    margin: 2em 0 2em 0;
`

const linkStyling = {
}

const Home = ({addToHistory}) => {
    return (
        <Wrapper>
            <HomeIcon 
                src={"assets/icons/home/Brush-Search.svg"}
                alt="HomeIcon"
            />
            <HomeWrapper>
                <TitleText>Der <span style={{"fontWeight": "bold", "fontSize": "26px", "letterSpacing": "1px"}}>Produktfinder</span> hilft Ihnen bei der Entscheidung für das Produkt, dass zu
                    Ihrem Projekt am besten passt.
                </TitleText>
                <InfoText>Durch das ausgeklügelte Fragen-Auswahl System können Sie die Anzahl an passenden Produkten 
                    auf ein Minimum reduzieren und sparen so viel Zeit bei der Suche
                </InfoText>
                <Link 
                    to="/fragen-und-antworten"
                    className={"link"}
                    style={linkStyling}
                    onClick={() => addToHistory("0")}
                >
                    <p className={"link-text"} style={{"marginRight": "20px", "fontWeight": "bold"}}>Loslegen</p>
                    <img 
                        src="assets/icons/misc/right.png"
                        style={{"height": "25px", "width": "25px", "margin": "5px"}}
                        alt="BackButton"
                    />
                </Link>
            </HomeWrapper>
        </Wrapper>
    )
}

const mapDispatchToProps = dispatch => ({
    addToHistory: itemId => dispatch(addToHistory(itemId))
})

export default connect(null, mapDispatchToProps)(Home)
