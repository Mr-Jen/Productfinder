import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { removeFromHistory } from '../../../actions/history'

const Button = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  height: 2em;
  border-radius: .3em;
  border: 1px solid grey;
  padding: 1em;
  background-color: rgb(240, 240, 240);
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
        <div>
            <Button onClick={() => ButtonRemoveFromHistory(historyLength - 1)}>
                <Icon src="assets/icons/misc/left.png"/>
                <Text>Zurück</Text>
            </Button>
        </div>
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
