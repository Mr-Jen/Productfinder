import React from 'react'
import { connect, ReactReduxContext } from 'react-redux'
import watch from 'redux-watch'
import { useContext } from 'react';
import styled from 'styled-components'
import { useHistory } from "react-router-dom";

import { addToHistory } from '../../../actions/history'
import { setCoating, setCoatingLength, setRoughness, setTarget, setWoodType } from '../../../actions/user'
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
  display: flex;
  align-items: center;
  margin: 2em 0 2em 0;
`

const ButtonContentWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 3em;

  background: #FFE60A;
  border-radius: 5px;
  cursor: pointer;
  cursor: ${props => props.disabled && 'not-allowed'};
  :active {
    color: darkblue;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  border: 2px solid transparent;

  @media (hover: hover) and (pointer: fine) {
    &:hover { 
      color: #01447e;
      border: 2px solid black;
      /*background-color: #f5dd0a;*/
    }
  }
  @media (max-width: 500px) {
    border: 1px solid rgb(232, 232, 232);
  }
  @media (max-width: 480px){
    padding: .2em;
  }
  //webkit-box-shadow: 6px 6px 5px 1px rgba(0,0,0,0.07); 
  //box-shadow: 6px 6px 5px 1px rgba(0,0,0,0.07);

`

const ChoiceButton = styled.div`
  border-radius: 5px;
  width: 100%;
  text-align: center;

  @media (max-width: 500px) {
    font-size: .9em;
  }
  margin: 0 1em 0 1em;
`

const Icon = styled.img``

const InfoButton = styled.button`
  height: 3em;
  width: 3em;
  margin-left: 1em;
  border: 1px solid transparent;
  border-radius: 7px;
  padding-top: 4px;
  background: #FFE60A;
  cursor: pointer;
  transition: all .2s ease-in-out;

  /*&:hover ${Icon} {
    transform: scale(1.2); 
  }*/
  @media (hover: hover) and (pointer: fine) {
    &:hover { 
      color: #01447e;
      border: 2px solid black;
      /*background-color: #f5dd0a;*/
    }
  }
  -webkit-box-shadow: 6px 6px 5px 1px rgba(0,0,0,0.15); 
  box-shadow: 6px 6px 5px 1px rgba(0,0,0,0.15);
  //box-shadow: 0px 1px 60px -7px rgba(0,0,0,0.89);
  //-webkit-box-shadow: 0px 1px 60px -7px rgba(0,0,0,0.89);
  //-moz-box-shadow: 0px 1px 60px -7px rgba(0,0,0,0.89);
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

const Items = ({childrenItems, ButtonAddToHistory, action, ButtonAddTarget, ButtonSetCoating, ButtonSetCoatingLength, ButtonSetRoughness, ButtonSetWoodtype, coatingLength, target_action }) => {
  const [showInfoCard, setShowInfoCard] = React.useState(false);
  const [cardContent, setCardContent] = React.useState();
  const [allowDispatch, setAllowDispatch] = React.useState(true);
  const [isDesktop, setIsDesktop] = React.useState(false)

  const history = useHistory();

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

  React.useEffect(() => {
    let isMounted = true;
    let w = watch(store.getState, "history")
    store.subscribe(w((newVal, oldVal) => {
      if (oldVal.length > newVal.length && isMounted){
        setAllowDispatch(true)
      }
    }))

    isMounted = false;
  }, [])

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

  const onClickButton = (key, target) => {
    //console.log("TARGET: ", target?.woodtype)

    if (target_action === 'set_target'){
      ButtonAddTarget(target.label)
    }
    else if (action === 'set_coating' && target){
      target.action_value !== undefined && ButtonSetCoating(target.action_value)
    }

    if (target?.roughness !== null){
      ButtonSetRoughness(target.roughness)
    }

    if (target?.woodtype !== undefined){
      //console.log("WOOD TYPE EXISTS", target.woodtype)
      ButtonSetWoodtype(target.woodtype)
    }

    if (childrenItems[key].children === null ){
      history.push("/products");
    }
    else {
      ButtonAddToHistory(key)
      window.history.pushState(null, null, "/fragen-und-antworten")
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
      <div>
        { (childrenItems && childrenItems !== "no-products") &&
          Object.keys(childrenItems).map(key => (
            <ButtonInsideWrapper onClick={(e) => onClickButton(key, childrenItems[key], e)} key={key}>
              <ButtonContentWrapper>
                <ChoiceButton>
                  <span style={{fontWeight: "bold"}}>{childrenItems[key].label}</span>
                </ChoiceButton>
              </ButtonContentWrapper>
              <InfoButton 
                style={{visibility: `${childrenItems[key]["info"] ? "visible" : "hidden"}`}} 
                onClick={(e) => onClickInfo(childrenItems[key]["info"] ? childrenItems[key]["info"] : default_info, e)}
              >
                {/*<Icon alt="info" height="20px" width="20px" src={childrenItems[key]["info"] && (hasWarning(childrenItems[key]) ? "/assets/icons/misc/warning (1).png"  : "/assets/icons/misc/info.svg")}></Icon>*/}
                <Icon alt="info" height="20px" width="20px" src={"/assets/icons/misc/info.svg"}></Icon>
              </InfoButton>
            </ButtonInsideWrapper>
          ))
        }
      </div>
      {(showInfoCard && isDesktop) &&
          <div>
            <InfoCard data={cardContent} onClose={() => setShowInfoCard(false)}/>
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
  ButtonSetCoatingLength : length => dispatch(setCoatingLength(length)),
  ButtonSetRoughness : roughness => dispatch(setRoughness(roughness)),
  ButtonSetWoodtype : woodtype => dispatch(setWoodType(woodtype))
})

export default connect(mapStateToProps, mapDispatchToProps)(Items)
