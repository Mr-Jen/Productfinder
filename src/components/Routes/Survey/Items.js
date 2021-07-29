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

const ButtonInsideWrapper = styled.div`
  border: 2px solid transparent;
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
  margin: 2em 0 2em 0;
  border: 2px solid transparent;
  /*&:hover {
    color: #01447e;
    border: 2px solid black;
  }*/
  @media (hover: hover) and (pointer: fine) {
    &:hover { 
      color: #01447e;
      border: 2px solid black;
  }
  }
  @media (max-width: 500px) {
    margin: 1.5em 0 1.5em 0;
    border: 1px solid rgb(232, 232, 232);
  }
`

const ChoiceButton = styled.div`
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  cursor: ${props => props.disabled && 'not-allowed'};
  /*pointer-events: ${props => props.disabled && 'none'};*/
  /*opacity: ${props => props.disabled && 0.5};
  background: ${props => props.disabled && '#CCC'};*/
  width: 100%;
  text-align: center;

  @media (max-width: 500px) {
    font-size: .9em;
  }
`

const ButtonWrapper = styled.div`
`

const Icon = styled.img``

const InfoButton = styled.button`
  border: 1px solid #ffee52;
  border-radius: 7px;
  padding-top: 4px;
  margin: 0 .3em 0 1em;
  background: #FFE60A;
  cursor: pointer;
  transition: all .2s ease-in-out;

  &:hover ${Icon} {
    transform: scale(1.2); 
  }
  box-shadow: 0px 1px 60px -7px rgba(0,0,0,0.89);
  -webkit-box-shadow: 0px 1px 60px -7px rgba(0,0,0,0.89);
  -moz-box-shadow: 0px 1px 60px -7px rgba(0,0,0,0.89);
`

const CardWrapper = styled.div`
  height: 100vh;
  min-height: -webkit-fill-available;
  min-height: 100%;
  width: 100vw;
  background: grey;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  opacity: 0.9;
  z-index: 1000000;
`

const Items = ({childrenItems, ButtonAddToHistory, action, ButtonAddTarget, ButtonSetCoating, ButtonSetCoatingLength, coatingLength, target_action }) => {
  const [showInfoCard, setShowInfoCard] = React.useState(false);
  const [cardContent, setCardContent] = React.useState();
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
    setIsDesktop(window.innerWidth > 800)
  }

  const { store } = useContext(ReactReduxContext)

  let w = watch(store.getState, "history")
  store.subscribe(w((newVal, oldVal) => {
    if (oldVal.length > newVal.length){
      setAllowDispatch(true)
    }
  }))


  React.useEffect(() => {
    if(allowDispatch){
      ButtonSetCoatingLength(coatingLength)
      setAllowDispatch(false)
    }
    //unsubscribe()
  })

  const onClickInfo = (item, e) => {
    setShowInfoCard(!showInfoCard)
    setCardContent(item)
    e.stopPropagation()
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


  const hasWarning = (info) => {
    let warn = false;
    Object.keys(info["info"]).forEach((item) => {
      if (info["info"][item]?.warning){
        warn = true;
      }
    })
    return warn
  }

  return (
    <ChoiceWrapper>
      <ButtonWrapper>
        { (childrenItems && childrenItems !== "no-products") &&
          Object.keys(childrenItems).map(key => (
            <ButtonInsideWrapper onClick={(e) => onClickButton(key, childrenItems[key], e)} key={key}>
              <ButtonContentWrapper>
                <InfoButton style={{visibility: "hidden"}}>
                  <Icon alt="info" onClick={() => onClickInfo(childrenItems[key]["info"] ? childrenItems[key]["info"] : default_info)} height="20px" width="20px" src="assets/icons/misc/info.svg"></Icon>
                </InfoButton>
                <ChoiceButton>
                  <span style={{fontWeight: "bold"}}>{childrenItems[key].label}</span>
                </ChoiceButton>
                <InfoButton style={{visibility: `${childrenItems[key]["info"] ? "visible" : "hidden"}`}}>
                  <Icon alt="info" onClick={(e) => onClickInfo(childrenItems[key]["info"] ? childrenItems[key]["info"] : default_info, e)} height="20px" width="20px" src={childrenItems[key]["info"] && (hasWarning(childrenItems[key]) ? "/assets/icons/misc/warning (1).png"  : "/assets/icons/misc/info.svg")}></Icon>
                </InfoButton>
              </ButtonContentWrapper>
            </ButtonInsideWrapper>
          ))
        }
      </ButtonWrapper>
      {(showInfoCard && isDesktop) &&
          <div>
            <InfoCard data={cardContent} />
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
