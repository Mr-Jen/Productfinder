import React, {useState} from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { handleLoadConfig } from '../actions/shared'

import Home from '../components/Home'
import Items from './Items'
import Infos from './Infos'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`

const BreadCrumbWrapper = styled.div`
  display: flex:
`

const BreadCrumb = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: blue;
  cursor: pointer;
  margin: 3px;
`

const ChoiceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`

const ChoiceButton = styled.button`
  padding: 5px;
  margin: 5px;
`

const Button = styled.button`
  width: 10%;
  margin: 2%;
`

const App = ({loadConfig, isHome}) => {
  React.useEffect(() => {loadConfig()}, [loadConfig])

  console.log("IS HOME: ", isHome)

  return (
    <Wrapper>
      <h1>Produktfinder</h1>
      { isHome ? <Home/>
        : 
        <div>
          <Infos/>
          <Items/>
        </div>
      }
    </Wrapper> 
  )
}

const mapDispatchToProps = dispatch => ({
  loadConfig: () => dispatch(handleLoadConfig())
})

const mapStateToProps = ({history}) => {
  return {
      isHome: history.length === 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)