import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import { handleLoadConfig } from '../actions/shared'
import { removeFromHistory } from '../actions/history'

import Home from './Routes/Home/Home'
import NavigateButton from './Shared/NavigateButton'
import Products from './Routes/Products/Products'
import Header from './Shared/Header'
import Survey from './Routes/Survey/Survey'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: auto;
`

const HeaderWrap = styled.div`
  display: flex;
  align-self: flex-start;
`

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
`


const App = ({loadConfig, isHome, handleNavigationChange}) => {
  React.useEffect(() => {loadConfig()}, [loadConfig])

  console.log("IS HOME: ", isHome)

  return (
    <Wrapper>
      <HeaderWrap>
        <Header/>
      </HeaderWrap>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/fragen-und-antworten">
          <Survey/>
        </Route>
        <Route exact path="/products">
          <HeaderWrapper>
              <NavigateButton
                location={"/fragen-und-antworten"} 
                text={"Zurück"} 
                direction={"left"}
              />
          </HeaderWrapper>
          <Products/>
        </Route>
      </Switch>
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