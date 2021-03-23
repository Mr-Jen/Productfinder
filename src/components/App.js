import React, {useState, useEffect} from 'react'
//import { getData } from '../shared/api'

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

  const handleClick = (item) => {
    setData(item.children)
    setParentData(item)
    setHistoryStack(historyStack.concat(item))
  }

  const handleBack = () => {
    const updatedHistory = historyStack
    updatedHistory.pop()
    console.log('State before: ', updatedHistory)
    setHistoryStack(updatedHistory)
    console.log('State after: ', updatedHistory)
  }

  const [historyStack, setHistoryStack] = useState([])
  const [initData, setInitData] = useState({})
  const [data, setData] = useState([])
  const [parentData, setParentData] = useState({})

  const loadData = () => {
    setParentData(initData)
    setData(initData.children)
  }


  console.log('CURRENT DATA: ', data)
  console.log('STACK: ', historyStack, historyStack.length, typeof(historyStack))

  return (
    <div>
      <h1>Produktfinder</h1>
      <h2>{data.question}</h2>
      {
        data.length === 0  && <button onClick={() => loadData()}>Start</button>
      }
      {
        Object.keys(parentData).length !== 0  && 
        <div>
          <h2>{parentData.label}</h2>
          <p>{parentData.question}</p>
          <button onClick={() => handleBack()}>Zurück</button>
        </div>
      }
      {
        data && data.map((item, key) => 
          <div key={key}>
            <button onClick={() => handleClick(item)}>{item.label}</button>
          </div>
        )
      }
      {
        historyStack && historyStack.map((item, key) => {
          <div key={key}>
            <h5>History</h5>
            <p>{item.label}</p>
          </div>
        })
      }
    </div> 
  )
}

export default App
