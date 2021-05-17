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
  background: #FFE60A;
  border-radius: 5px;
  cursor: pointer;
  cursor: ${props => props.disabled && 'not-allowed'};
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
  cursor: ${props => props.disabled && 'not-allowed'};
  /*pointer-events: ${props => props.disabled && 'none'};*/
  /*opacity: ${props => props.disabled && 0.5};
  background: ${props => props.disabled && '#CCC'};*/
`

const InfoButton = styled.button`
  border: none;
  background: #FFE60A;
  cursor: pointer;
`

const CardWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: grey;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.9;
`

const Items = ({childrenItems, ButtonAddToHistory}) => {
  const [showInfoCard, setShowInfoCard] = React.useState(false);
  const [cardContent, setCardContent] = React.useState();
  const [enabledCard, setEnabledCard] = React.useState(false);

  const onClickInfo = (item) => {
    setShowInfoCard(!showInfoCard)
    setCardContent(item)
  }

  const onClickAgree = () => {
    setEnabledCard(true)
  }


  const checkWarning = (index) => {
    let res;
    childrenItems[index]?.info && Object.keys(childrenItems[index].info).forEach(key => {
      if (childrenItems[index].info[key]?.warning){
        res = true;
      }
    })
    return res
  }

  return (
    <ChoiceWrapper>
      { (childrenItems && childrenItems !== "no-products") &&
        Object.keys(childrenItems).map(key => (
          <div key={key}>
            <ButtonContentWrapper disabled={checkWarning(key) && !enabledCard}>
              <ChoiceButton disabled={checkWarning(key) && !enabledCard} onClick={() => ButtonAddToHistory(key)}>
                <span style={{fontWeight: "bold"}}>{childrenItems[key].label}</span>
              </ChoiceButton>
              <InfoButton>
                <img alt="info" onClick={() => onClickInfo(childrenItems[key]["info"])} height="20px" src="assets/icons/misc/info.svg"></img>
              </InfoButton>
            </ButtonContentWrapper>
          </div>
        ))
      }
      {showInfoCard && 
          <div>
            <InfoCard onAgree={() => onClickAgree()} data={cardContent}/>
            <CardWrapper onClick={() => setShowInfoCard(false)}/>
          </div>
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
