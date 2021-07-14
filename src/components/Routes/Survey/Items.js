import React from 'react'
import { connect, ReactReduxContext } from 'react-redux'
import watch from 'redux-watch'
import { useContext } from 'react';
import styled from 'styled-components'

import { addToHistory } from '../../../actions/history'
import { setCoating, setCoatingLength, setTarget } from '../../../actions/user'
import InfoCard from './InfoCard'
import MobileInfoCard from './MobileInfoCard/MobileInfoCard';

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
  justify-content: space-between;
  background: #FFE60A;
  border-radius: 5px;
  cursor: pointer;
  cursor: ${props => props.disabled && 'not-allowed'};
  :active {
    color: darkblue;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  margin: 3em 0 3em 0;
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

const ButtonWrapper = styled.div`
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

const Items = ({childrenItems, ButtonAddToHistory, action, ButtonAddTarget, ButtonSetCoating, ButtonSetCoatingLength, coatingLength, target_action }) => {
  const [showInfoCard, setShowInfoCard] = React.useState(false);
  const [cardContent, setCardContent] = React.useState();
  const [enabledCard, setEnabledCard] = React.useState(false);
  const [allowDispatch, setAllowDispatch] = React.useState(true);
  const [isDesktop, setIsDesktop] = React.useState(false)

  React.useEffect(() => {
    updatePredicate();
    window.addEventListener('resize', () => updatePredicate());
  
    // returned function will be called on component unmount 
    return () => {
      window.removeEventListener('resize', () => updatePredicate())
    }
  }, [])

  const updatePredicate = () => {
    setIsDesktop(window.innerWidth > 600)
  }

  const { store } = useContext(ReactReduxContext)

  let w = watch(store.getState, "history")
  store.subscribe(w((newVal, oldVal) => {
    if (oldVal.length > newVal.length){
      setAllowDispatch(true)
    }
  }))

  //Unsubscribing from the store subscription
  /*const unsubscribe = store.subscribe(() =>
    console.log('State after dispatch: ', store.getState())
  )*/

  React.useEffect(() => {
    if(allowDispatch){
      ButtonSetCoatingLength(coatingLength)
      setAllowDispatch(false)
    }
    //unsubscribe()
  })

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

  //console.log("THE ACTION: ", action)

  const onClickButton = (key, target) => {
    //console.log("ACTION INSIDE BUTTON HANDLER: ", action)
    ButtonAddToHistory(key)
    //console.log("GOAL: ", target, action)
    if (target_action === 'set_target'){
      //console.log("SETTING TARGET: ", target.label)
      ButtonAddTarget(target.label)
    }
    else if (action === 'set_coating' && target){
      //console.log("SETTING COATING: ", target?.action_value)
      target.action_value !== undefined && ButtonSetCoating(target.action_value)
    }
  }

  const default_info = {
      "0": {
          "id": 0,
          "title": "Abschleifen",
          "content": "Beim Abschleifen ist darauf zu achten, dass xyz",
          "image": "assets/images/paint-on-wood.gif"
      }
  }

  return (
    <ChoiceWrapper>
      <ButtonWrapper>
        { (childrenItems && childrenItems !== "no-products") &&
          Object.keys(childrenItems).map(key => (
            <div key={key}>
              <ButtonContentWrapper disabled={checkWarning(key) && !enabledCard}>
                <InfoButton style={{visibility: "hidden"}}>
                  <img alt="info" onClick={() => onClickInfo(childrenItems[key]["info"] ? childrenItems[key]["info"] : default_info)} height="20px" src="assets/icons/misc/info.svg"></img>
                </InfoButton>
                <ChoiceButton disabled={checkWarning(key) && !enabledCard} onClick={() => onClickButton(key, childrenItems[key])}>
                  <span style={{fontWeight: "bold"}}>{childrenItems[key].label}</span>
                </ChoiceButton>
                <InfoButton>
                  <img alt="info" onClick={() => onClickInfo(childrenItems[key]["info"] ? childrenItems[key]["info"] : default_info)} height="20px" src="assets/icons/misc/info.svg"></img>
                </InfoButton>
              </ButtonContentWrapper>
            </div>
          ))
        }
      </ButtonWrapper>
      {(showInfoCard && isDesktop) &&
          <div>
            <InfoCard onAgree={() => onClickAgree()} data={cardContent} />
            <CardWrapper onClick={() => setShowInfoCard(false)}/>
          </div>
      }
      {
        (showInfoCard && !isDesktop) &&
          <div>
            <CardWrapper onClick={() => setShowInfoCard(false)}/>  
            <MobileInfoCard closeCard={() => setShowInfoCard(false)} data={cardContent} />          
          </div>          
      }
    </ChoiceWrapper>
  )
}

const mapStateToProps = ({ decisions, history, user}) => {
  const coatings = user["coating"]
  let latestItem = decisions
  let amountOfAction = 0;
  let parentItem;
  history.forEach(itemId => {
    parentItem = latestItem[itemId]
    if(parentItem?.action && parentItem?.action === "set_coating"){
      amountOfAction += 1;
    }
    latestItem = latestItem[itemId].children
  })

  let action = parentItem?.action
  let target_action = parentItem?.target_action
  let coatingLength = action === "set_coating" ? amountOfAction - 1 : amountOfAction

  /*console.log("ACTION: ", action)*/

  //console.log("AMOUNT OF ACTIONS: ", amountOfAction)
  //console.log("LENGTH OF COATING SHOULD BE: ", coatingLength)

  return {
    childrenItems: latestItem,
    action: action,
    target_action,
    amountOfAction,
    coatingLength
  }
}

const mapDispatchToProps = dispatch => ({
  ButtonAddToHistory : itemId => dispatch(addToHistory(itemId)),
  ButtonAddTarget : target => dispatch(setTarget(target)),
  ButtonSetCoating : coating => dispatch(setCoating(coating)),
  ButtonSetCoatingLength : length => dispatch(setCoatingLength(length))
})

export default connect(mapStateToProps, mapDispatchToProps)(Items)
