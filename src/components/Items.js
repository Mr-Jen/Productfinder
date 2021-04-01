import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { addToHistory } from '../actions/history'

const ChoiceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`

const ChoiceButton = styled.button`
  padding: 5px;
  margin: 5px;
`

const Items = ({childrenItems, ButtonAddToHistory}) => {
    return (
        <ChoiceWrapper>
          { childrenItems &&
            Object.keys(childrenItems).map(key => (
              <div key={key}>
                <ChoiceButton onClick={() => ButtonAddToHistory(key)}>{childrenItems[key].label}</ChoiceButton>
              </div>
            ))
          }
      </ChoiceWrapper>
    )
}

const mapStateToProps = ({decisions, history}) => {
  let latestItem = decisions
  history.map (itemId => {
    latestItem = latestItem[itemId].children
  })

  return {
    childrenItems: latestItem 
  }
}

const mapDispatchToProps = dispatch => ({
    ButtonAddToHistory : itemId => dispatch(addToHistory(itemId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Items)
