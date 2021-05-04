import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { addToHistory } from '../../../actions/history'
import InfoCard from './InfoCard'

const ChoiceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`

const ButtonContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
  background: yellow;
  border-radius: 5px;
  cursor: pointer;
  :active {
    color: darkblue;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  margin: 10px;
`

const ChoiceButton = styled.div`
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
`

const InfoButton = styled.button`
  border: none;
  background: yellow;
  cursor: pointer;
`

const CardWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: grey;
  position: absolute;
  top: 0;
  opacity: 0.7;
`

const Items = ({childrenItems, ButtonAddToHistory}) => {
  const [showInfoCard, setShowInfoCard] = React.useState(false);
  const [cardContent, setCardContent] = React.useState();

  const onClickInfo = (item) => {
    setShowInfoCard(!showInfoCard)
    setCardContent(item)
  }

  return (
      <ChoiceWrapper>
        { childrenItems &&
          Object.keys(childrenItems).map(key => (
            <div key={key}>
              <ButtonContentWrapper>
                <ChoiceButton onClick={() => ButtonAddToHistory(key)}>
                    {childrenItems[key].label} 
                </ChoiceButton>
                <InfoButton>
                  <img alt="info" onClick={() => onClickInfo(childrenItems[key])} height="20px" src="assets/info.svg"></img>
                </InfoButton>
              </ButtonContentWrapper>
            </div>
          ))
        }
        {showInfoCard && 
          <CardWrapper onClick={() => setShowInfoCard(false)}>
            <InfoCard data={cardContent}/>
          </CardWrapper>
        }
    </ChoiceWrapper>
  )
}

const mapStateToProps = ({decisions, history}) => {
  let latestItem = decisions
  history.forEach(itemId => {
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
