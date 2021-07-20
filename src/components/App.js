import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import { handleLoadConfig, handleLoadProducts, loadProducts } from '../actions/shared'

import Home from './Routes/Home/Home'
import NavigateButton from './Shared/NavigateButton'
import Products from './Routes/Products/Products'
import Header from './Shared/Header'
import Survey from './Routes/Survey/Survey'
import ProductView from './Routes/ProductView/ProductView'
import Compare from './Routes/Compare/Compare'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: auto;
`

const HeaderWrap = styled.div`
  display: flex;
  align-self: flex-start;
  z-index: 1000000;

  position: sticky;
  top: 0;
`

const App = ({loadConfig, loadProducts, isHome}) => {
  React.useEffect(() => {loadConfig()}, [loadConfig])
  React.useEffect(() => {
    console.log("LOADING PRODUCTS IN APP")
    loadProducts()
  }, [loadProducts])

  console.log("IS HOME: ", isHome)

  //window.screen.orientation.lock('any')

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
          <Products/>
        </Route>
        
        <Route exact path="/product/:productId" component={ProductView} ></Route>
        <Route exact path="/compare/:productsParam" component={Compare} />
      </Switch>
    </Wrapper> 
  )
}

const mapDispatchToProps = dispatch => ({
  loadConfig: () => dispatch(handleLoadConfig()),
  loadProducts: () => dispatch(handleLoadProducts())
})


const mapStateToProps = ({history}) => {
  return {
      isHome: history.length === 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)