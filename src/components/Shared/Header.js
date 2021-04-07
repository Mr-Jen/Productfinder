import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { removeFromHistory } from '../../actions/history'

const Title = styled.button`
  display: flex;
  align-self: flex-start;
  padding: 0;
  border: none;
  background: none;
`

function Header({handleNavigationChange}) {
    return (
        <div>
            <Title onClick={() => handleNavigationChange(0)}>
                <h1>Produktfinder</h1>
            </Title>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    handleNavigationChange : index => dispatch(removeFromHistory(index))
})

export default connect(null, mapDispatchToProps)(Header)
