import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { removeFromHistory } from '../actions/history'

const Button = styled.button`
  width: 80px;
  margin: 2%;
`

const BackButton = ({ButtonRemoveFromHistory, historyLength}) => {
    console.log("LENGTH: ", historyLength)
    return (
        <div>
            <Button onClick={() => ButtonRemoveFromHistory(historyLength - 1)}>Zurück</Button>
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
