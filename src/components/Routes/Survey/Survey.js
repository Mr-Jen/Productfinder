import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { removeFromHistory } from '../../../actions/history'

import Items from './Items'
import Infos from './Infos'
import BackButton from './BackButton'
import BreadCrumbs from './BreadCrumbs'
import NavigateButton from '../../Shared/NavigateButton'

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90vw;
`

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
`

const BreadCrumbsWrapper = styled.div`
  display: flex;
  align-self: center;
  margin: auto
`

export const Survey = ({isHome, handleNavigationChange}) => {
    return (
        <div>
            <ContentWrapper>
                <HeaderWrapper>
                    <NavigateButton 
                    location={"/"} 
                    text={"Zurück"} 
                    direction={"left"}
                    onClick={() => handleNavigationChange(0)}
                    />
                    <BreadCrumbsWrapper>
                        <BreadCrumbs/>
                    </BreadCrumbsWrapper>
                </HeaderWrapper>
                <Infos/>
                <Items/>
                {!isHome && < BackButton/>}
            </ContentWrapper>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    handleNavigationChange : index => dispatch(removeFromHistory(index))
  })
  
  
const mapStateToProps = ({history}) => {
return {
    isHome: history.length === 0
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey)
