import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addToHistory } from '../../../actions/history'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 10vh;
`

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 40%;
`

const HomeIcon = styled.img`
    display: flex;
    align-self: center;
    height: 200px;
    width: 200px;
    margin-right: 20%;
`
const TitleText = styled.h2`
    line-height: 1.4;
`

const InfoText = styled.p`
    color: grey;
    font-size: 18px;
    line-height: 1.6;
`

const linkStyling = {
    display: 'flex',
    justifyContent: 'center',
    textDecoration: 'none',
    height: '40px',
    width: '200px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffe60a',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '10px'
}

const Home = ({addToHistory}) => {
    return (
        <Wrapper>
            <HomeIcon 
                src={"assets/Spilled-Bucket-Search.svg"}
                alt="HomeIcon"
            />
            <HomeWrapper>
                <TitleText>Der Produktfinder hilft Ihnen bei der Entscheidung für das Produkt, dass zu
                    Ihrem Projekt am besten passt.
                </TitleText>
                <InfoText>Durch das ausgeklügelte Fragen-Auswahl System können Sie die Anzahl an passenden Produkten 
                    auf ein Minimum reduzieren und sparen so viel Zeit bei der Suche
                </InfoText>
                <Link 
                    to="/fragen-und-antworten"
                    style={linkStyling}
                    onClick={() => addToHistory("0")}
                >
                    <p style={{"marginRight": "20px", "color": "black", "fontWeight": "bold"}}>Loslegen</p>
                    <img 
                        src="assets/right.png"
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
