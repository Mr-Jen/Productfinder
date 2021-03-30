import React, {useState} from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { handleLoadConfig } from '../actions/shared'
//import { getData } from '../shared/api'

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
  /*useEffect(() => {
    let isMounted = true
    fetch('api/config.json')
        .then((response) => response.json())
        .then((config) => {
          isMounted && setInitData(config)
        })
    return () => { isMounted = false }
  }, [])*/
  React.useEffect(() => {loadConfig()}, [loadConfig])

  const [historyStack, setHistoryStack] = useState([])
  const [initData, setInitData] = useState({})
  const [breadCrumbs, setBreadCrumbs] = useState([])

  // Adds item to the history stack
  const handleClick = (item) => {
    setHistoryStack(historyStack.concat(item))
    setBreadCrumbs(breadCrumbs.concat(item.label))
  }

  // Handles back action and removes the last item from the history stack
  const handleBack = () => {
    const updatedHistory = [...historyStack]
    updatedHistory.pop()
    setHistoryStack(updatedHistory)

    const updatedBreadCrumbs = [...breadCrumbs]
    updatedBreadCrumbs.pop()
    setBreadCrumbs(updatedBreadCrumbs)
  }

  const handleNavigationChange = (crumb) => {
    const crumbIndex = breadCrumbs.indexOf(crumb)
    const updatedCrumbs = [...breadCrumbs]
    updatedCrumbs.length = crumbIndex + 1
    setBreadCrumbs(updatedCrumbs)

    let stackIndex = null
    historyStack.forEach((item, index) => {
      if (item.label === crumb){
        stackIndex = index + 1
      }
    })
    const updatedHistoryStack = [...historyStack]
    updatedHistoryStack.length = stackIndex
    console.log('NEW STACK: ', updatedHistoryStack)
    setHistoryStack(updatedHistoryStack)
  }

  // Load the inital data received from the API call
  const loadData = () => {
    setHistoryStack(historyStack.concat(initData))
    setBreadCrumbs(breadCrumbs.concat(initData.label))
  }

  const latestItem = historyStack[historyStack.length -1]
  //console.log(latestItem)

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
      <BreadCrumbWrapper>
        {        
          breadCrumbs.map((crumb, key) => {
            return <BreadCrumb onClick={() => handleNavigationChange(crumb)} key={key}>{`${crumb}   -->`}</BreadCrumb>
          })
        }
      </BreadCrumbWrapper>
      {
        latestItem && 
        <div>
          <h2>{latestItem.label}</h2>
          <p>{latestItem.question}</p>
        </div>
      }
      {
        (latestItem  && latestItem.children) &&
          <ChoiceWrapper>
            {
              //latestItem && latestItem.children.map((item, key) => 
              latestItem?.children.map((item, key) =>
                <div key={key}>
                  <ChoiceButton onClick={() => handleClick(item)}>{item.label}</ChoiceButton>
                </div>
              )
            }
          </ChoiceWrapper>
      }
      { (latestItem && !latestItem.children) && <p>Wir empfehlen folgende Produkte:</p>} 
      {   
       latestItem && <Button onClick={() => handleBack()}>Zurück</Button>
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