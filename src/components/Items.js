import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { addToHistory } from '../actions/shared'

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
          { childrenItems ?
            Object.keys(childrenItems).map((key) => {
              return <div key={key}>
                <ChoiceButton onClick={() => ButtonAddToHistory(key)}>{childrenItems[key].label}</ChoiceButton>
              </div>
            })  
            : <p>Wir empfehlen Ihnen folgende Produkte:</p>  
          }
      </ChoiceWrapper>
    )
}

const mapStateToProps = ({decisions, history}) => {
  let latestItem = decisions
  history.map (itemId => {
    latestItem = latestItem[itemId].children
  })

  console.log("CHILDREN: ", latestItem)

  return {
    childrenItems: latestItem 
  }
}

const mapDispatchToProps = dispatch => ({
    ButtonAddToHistory : item => dispatch(addToHistory(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(Items)
