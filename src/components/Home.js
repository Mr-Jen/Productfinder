import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

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

const Button = styled.button`
  width: 100px;
  margin: 2%;
  padding: 7px;
  background-color: yellow;
  border-radius: 5px;
`

const Home = ({addToHistory}) => {
    return (
        <HomeWrapper>
            <h2>Der Produktfinder hilft Ihnen bei der Entscheidung für das Produkt, dass zu
                Ihrem Projekt am besten passt.
            </h2>
            <InfoText>Durch das ausgeklügelte Fragen-Auswahl System können Sie die Anzahl an passenden Produkten 
                auf ein Minimum reduzieren und sparen so viel Zeit bei der Suche
            </InfoText>
            <Button onClick={() => addToHistory("0")}>Loslegen --></Button>
        </HomeWrapper>
    )
}

const mapDispatchToProps = dispatch => ({
    addToHistory: itemId => dispatch(addToHistory(itemId))
})

export default connect(null, mapDispatchToProps)(Home)
