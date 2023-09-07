import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { removeFromHistory } from '../../../actions/history'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1em;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  height: 2em;
  border-radius: .3em;
  border: 1px solid black;
  padding: 1em;
  color: white;
  background-color: black;
  cursor: pointer;
  &:hover {
      background-color: rgb(144,144,144);
  }

  /*position: fixed;*/
  */bottom: 5vh;*/
`

const Icon = styled.img`
    height: 1.5em;
`

const Text = styled.p`
    font-weight: bold;
    padding: .5em;
`

const BackButton = ({ButtonRemoveFromHistory, historyLength}) => {
    return (
        <Wrapper>
            <Button onClick={() => ButtonRemoveFromHistory(historyLength - 1)}>
                <Icon src="assets/icons/misc/back.png"/>
                <Text>Zurück</Text>
            </Button>
        </Wrapper>
    )
}

const mapStateToProps = ({history}) => {
    return {
        historyLength: history.length
    }
}

const mapDispatchToProps = dispatch => ({
    ButtonRemoveFromHistory : itemId => dispatch(removeFromHistory(itemId))
})

export default connect(mapStateToProps, mapDispatchToProps)(BackButton)
