import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { removeFromHistory } from '../../../actions/history'

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

export const Survey = ({isHome, isFirst, handleNavigationChange}) => {
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
                { isFirst ?                   
                  <NavigateButton 
                    location={"/"} 
                    text={"Zum Start"} 
                    direction={"left"}
                    onClick={() => handleNavigationChange(0)}
                  /> : <BreadCrumbs/>
                }
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
    handleNavigationChange : index => dispatch(removeFromHistory(index))
  })
  
  
const mapStateToProps = ({history}) => {
return {
    isHome: history.length === 0,
    isFirst: history.length === 1
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey)
