import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
//import { getData } from '../shared/api'

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`

const ChoiceWrapper = styled.div`
  display: flex;
  flex-direction: row;
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
      {        
        breadCrumb.map((crumb, key) => {
          return <a href="/" key={key}>{`${crumb}   -->`}</a>
        })
      }
      {
        latestItem && 
        <div>
          <h2>{latestItem.label}</h2>
          <p>{latestItem.question}</p>
        </div>
      }
      <ChoiceWrapper>
        {
          latestItem && latestItem.children.map((item, key) => 
            <div key={key}>
              <button onClick={() => handleClick(item)}>{item.label}</button>
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
