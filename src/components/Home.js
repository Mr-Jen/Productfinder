import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { addToHistory } from '../actions/shared'

const Button = styled.button`
  width: 80px;
  margin: 2%;
`

const Home = ({addToHistory}) => {
    return (
        <div>
            <Button onClick={() => addToHistory("0")}>Start</Button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addToHistory: itemId => dispatch(addToHistory(itemId))
})

export default connect(null, mapDispatchToProps)(Home)
