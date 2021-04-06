import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { handleLoadConfig } from '../actions/shared'
import { removeFromHistory } from '../actions/history'

import Home from '../components/Home'
import Items from './Items'
import Infos from './Infos'
import BackButton from './BackButton'
import BreadCrumbs from './BreadCrumbs'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`

const Title = styled.button`
  padding: 0;
  border: none;
  background: none;

`

const App = ({loadConfig, handleNavigationChange, isHome}) => {
  React.useEffect(() => {loadConfig()}, [loadConfig])

  console.log("IS HOME: ", isHome)

  return (
    <Wrapper>
      <Title onClick={() => handleNavigationChange(0)}>
        <h1>Produktfinder</h1>
      </Title>
      { isHome ? <Home/>
        : 
        <Wrapper>
          <BreadCrumbs/>
          <Infos/>
          <Items/>
          <BackButton/>
        </Wrapper>
      }
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