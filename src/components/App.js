import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Switch, Route } from 'react-router-dom'

import { handleLoadConfig, handleLoadProducts } from '../actions/shared'

import Home from './Routes/Home/Home'
import Products from './Routes/Products/Products'
import Header from './Shared/Header'
import Survey from './Routes/Survey/Survey'
import ProductView from './Routes/ProductView/ProductView'
import Compare from './Routes/Compare/Compare'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  max-width: 100vw;
`

const HeaderWrap = styled.div`
  display: flex;
  align-self: flex-start;
  z-index: 1000000;
  max-width: 100%;
  margin-bottom: 2em;

  position: sticky;
  top: 0;
`

const ContentWrapper = styled.div`
  width: 90vw;
`

const App = ({loadConfig, loadProducts, isHome}) => {

  const [headerHeight, setHeaderHeight] = React.useState(95);

  React.useEffect(() => {loadConfig()}, [loadConfig])
  React.useEffect(() => {
    loadProducts()
  }, [loadProducts])

  React.useEffect(() => {
    const header = document.getElementById("wrapper");
    setHeaderHeight(header.offsetHeight);
  }, []);

  return (
    <Wrapper>
      <HeaderWrap>
        <Header id="wrapper"/>
      </HeaderWrap>
      <ContentWrapper>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/fragen-und-antworten">
            <Survey/>
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          
          <Route exact path="/product/:productId" component={ProductView} ></Route>
          {/*<Route exact path="/compare/:productsParam" headerHeight={20} component={Compare} />*/}
          <Route exact path="/compare/:productsParam" render={(props) => <Compare {...props} headerHeight={headerHeight} />} />
        </Switch>
      </ContentWrapper>
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