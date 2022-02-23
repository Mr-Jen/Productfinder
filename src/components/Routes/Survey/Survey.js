import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { removeFromHistory } from '../../../actions/history'

import Items from './Items'
import Infos from './Infos'
import BackButton from './BackButton'
import BreadCrumbs from './BreadCrumbs'
import NavigateButton from '../../Shared/NavigateButton'
import { changeEnd } from '../../../actions/end'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
`

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2em;
`

export const Survey = ({isHome, isFirst, handleNavigationChange, historyLength, end, handleChangeEnd}) => {
  console.log("END: ", end)

  window.onpopstate = function(event) {
    console.log("END INSIDE: ", end)
    if(document.location.pathname === "/fragen-und-antworten" && historyLength>0 && end === false){
      console.log("HANDLING NAVIGATION CHANGE");
      handleNavigationChange(historyLength - 1);
    }
  }

  React.useEffect(() => {
    handleChangeEnd(false);
  }, [])

  console.log(isHome, isFirst)
  return (
      <Wrapper>
          <HeaderWrapper>
              { isHome &&
                <NavigateButton 
                location={"/"} 
                text={"Zurück"} 
                direction={"left"}
                onClick={() => handleNavigationChange(0)}
                />
              }
              {isFirst ?                   
                <NavigateButton 
                  location={"/"} 
                  text={"Zum Start"} 
                  direction={"left"}
                  onClick={() => handleNavigationChange(0)}
                /> : <BreadCrumbs/>}
          </HeaderWrapper>
          <ContentWrapper>
            <Infos/>
            <Items/>
            {(!isHome && !isFirst) &&  < BackButton/>}
          </ContentWrapper>
      </Wrapper>
  )
}

const mapDispatchToProps = dispatch => ({
    handleNavigationChange : index => dispatch(removeFromHistory(index)),
    handleChangeEnd : state => dispatch(changeEnd(state))
})
  
  
const mapStateToProps = ({history, end}) => {
  return {
      isHome: history.length === 0,
      isFirst: history.length === 1,
      historyLength: history.length,
      end
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey)
