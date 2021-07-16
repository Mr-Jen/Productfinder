import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { removeFromHistory } from '../../../actions/history'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled.button`
  display: flex;
  align-items: center;
  height: 2em;
  border-radius: .3em;
  border: 1px solid grey;
  padding: 1em;
  background-color: rgb(240, 240, 240);
  cursor: pointer;
  &:hover {
      background-color: rgb(219, 217, 217);
  }

  /*position: fixed;*/
  */bottom: 5vh;*/
`

const Icon = styled.img`
    height: 2em;
`

const Text = styled.p`
    font-weight: bold;
    padding: .5em;
`

const BackButton = ({ButtonRemoveFromHistory, historyLength}) => {
    return (
        <Wrapper>
            <Button onClick={() => ButtonRemoveFromHistory(historyLength - 1)}>
                <Icon src="assets/icons/misc/left.png"/>
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
