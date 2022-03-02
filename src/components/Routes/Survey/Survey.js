import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { removeFromHistory } from '../../../actions/history'
import { resetSurfaces, resetApplications } from '../../../actions/filter'
import { changeEnd } from '../../../actions/end'

import Items from './Items'
import Infos from './Infos'
import BackButton from './BackButton'
import BreadCrumbs from './BreadCrumbs'
import NavigateButton from '../../Shared/NavigateButton'

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

export const Survey = ({isHome, isFirst, handleNavigationChange, historyLength, end, handleChangeEnd, onResetApplications, onResetSurfaces, filter}) => {

  // Check if filters are active
  React.useEffect(() => {
    if(Object.keys(filter).length > 0){
      if(filter.surfaces.includes(true) || filter.applications.includes(true)){
        onResetApplications();
        onResetSurfaces();
      }
    }
  }, [])

  window.onpopstate = function(event) {
    if(document.location.pathname === "/fragen-und-antworten" && historyLength>0 && end === false){
      handleNavigationChange(historyLength - 1);
    }
  }

  React.useEffect(() => {
    if(end === true){
      handleChangeEnd(false);
    }
  })

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
    handleChangeEnd : state => dispatch(changeEnd(state)),
    onResetSurfaces : () => dispatch(resetSurfaces()),
    onResetApplications : () => dispatch(resetApplications())
})  
  
const mapStateToProps = ({history, end, filter}) => {
  return {
      isHome: history.length === 0,
      isFirst: history.length === 1,
      historyLength: history.length,
      end,
      filter
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey)
