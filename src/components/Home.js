import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { addToHistory } from '../actions/history'

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;s
`

const InfoText = styled.p`
    color: grey;
    font-size: 18px;
`

const linkStyling = {
    textDecoration: 'none',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffe60a',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '10px'
}

const Home = ({addToHistory}) => {
    return (
        <HomeWrapper>
            <h2>Der Produktfinder hilft Ihnen bei der Entscheidung für das Produkt, dass zu
                Ihrem Projekt am besten passt.
            </h2>
            <InfoText>Durch das ausgeklügelte Fragen-Auswahl System können Sie die Anzahl an passenden Produkten 
                auf ein Minimum reduzieren und sparen so viel Zeit bei der Suche
            </InfoText>
            <Link 
                to="/fragen-und-antworten"
                style={linkStyling}
            >
                <p style={{"marginRight": "20px", "color": "black", "fontWeight": "bold"}}>Loslegen</p>
                <img 
                    src="assets/right.png"
                    style={{"height": "25px", "width": "25px", "margin": "5px"}}
                    alt="BackButton"
                />
            </Link>
            {/*<Button onClick={() => addToHistory("0")}>Loslegen --> </Button>*/}
        </HomeWrapper>
    )
}

const mapDispatchToProps = dispatch => ({
    addToHistory: itemId => dispatch(addToHistory(itemId))
})

export default connect(null, mapDispatchToProps)(Home)
