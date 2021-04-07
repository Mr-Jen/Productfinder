import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import { handleLoadConfig } from '../actions/shared'
import { removeFromHistory } from '../actions/history'

import Home from '../components/Home'
import Items from './Items'
import Infos from './Infos'
import BackButton from './BackButton'
import BreadCrumbs from './BreadCrumbs'
import NavigateButton from './NavigateButton'
import Products from './Products'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;
`

const Title = styled.button`
  padding: 0;
  border: none;
  background: none;
`

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

const App = ({loadConfig, handleNavigationChange, isHome}) => {
  React.useEffect(() => {loadConfig()}, [loadConfig])

  console.log("IS HOME: ", isHome)

  return (
    <Wrapper>
      <Title onClick={() => handleNavigationChange(0)}>
        <h1>Produktfinder</h1>
      </Title>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/fragen-und-antworten">
          <ContentWrapper>
            <HeaderWrapper>
              <NavigateButton location={"/"} text={"Zurück"} direction={"left"}/>
              <BreadCrumbsWrapper>
                <BreadCrumbs/>
              </BreadCrumbsWrapper>
            </HeaderWrapper>
            <Infos/>
            <Items/>
            {!isHome && < BackButton/>}
          </ContentWrapper>
        </Route>
        <Route exact path="/products">
          <HeaderWrapper>
              <NavigateButton location={"/fragen-und-antworten"} text={"Zurück"} direction={"left"}/>
          </HeaderWrapper>
          <Products/>
        </Route>
      </Switch>
      {/* isHome ? <Home/>
        : 
        <ContentWrapper>
          <BreadCrumbs/>
          <Infos/>
          <Items/>
          <BackButton/>
        </ContentWrapper>
      */}
    </Wrapper> 
  )
}

const mapDispatchToProps = dispatch => ({
  loadConfig: () => dispatch(handleLoadConfig()),
  handleNavigationChange : index => dispatch(removeFromHistory(index))
})


const mapStateToProps = ({history}) => {
  return {
      isHome: history.length === 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)