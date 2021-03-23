import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
//import { getData } from '../shared/api'

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

const App = () => {
  useEffect(() => {
    let isMounted = true
    fetch('api/config.json')
        .then((response) => response.json())
        .then((config) => {
          isMounted && setInitData(config)
        })
    return () => { isMounted = false }
  }, [])

  const [historyStack, setHistoryStack] = useState([])
  const [initData, setInitData] = useState({})
  const [breadCrumb, setBreadCrumb] = useState([])

  // Adds item to the history stack
  const handleClick = (item) => {
    setHistoryStack(historyStack.concat(item))
    setBreadCrumb(breadCrumb.concat(item.label))
  }

  // Handles back action and removes the last item from the history stack
  const handleBack = () => {
    const updatedHistory = [...historyStack]
    updatedHistory.pop()
    setHistoryStack(updatedHistory)

    const updatedBreadCrumb = [...breadCrumb]
    updatedBreadCrumb.pop()
    setBreadCrumb(updatedBreadCrumb)
  }

  const handleNavigationChange = (crumb) => {
    console.log("Navigation changed", crumb)
  }

  // Load the inital data received from the API call
  const loadData = () => {
    setHistoryStack(historyStack.concat(initData))
  }

  const latestItem = historyStack[historyStack.length -1]
  console.log(latestItem)

  console.log('KRÜMEL: ', breadCrumb)

  return (
    <Wrapper>
      <h1>Produktfinder</h1>
      {
        !latestItem  && <Button onClick={() => loadData()}>Start</Button>
      }
      {/*<p>{breadCrumb}</p>*/}
      <BreadCrumbWrapper>
        {        
          breadCrumb.map((crumb, key) => {
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
      {   
       latestItem && <Button onClick={() => handleBack()}>Zurück</Button>
      }
    </Wrapper> 
  )
}

export default App