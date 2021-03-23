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
    setHistoryStack(historyStack.concat(item))
  }

  const handleBack = () => {
    const updatedHistory = [...historyStack]
    updatedHistory.pop()
    //console.log('State before: ', updatedHistory)
    setHistoryStack(updatedHistory)
    //console.log('State after: ', updatedHistory)
  }

  const [historyStack, setHistoryStack] = useState([])
  const [initData, setInitData] = useState({})

  const loadData = () => {
    setHistoryStack(historyStack.concat(initData))
  }

  const latestItem = historyStack[historyStack.length -1]

  return (
    <div>
      <h1>Produktfinder</h1>
      {
        !latestItem  && <button onClick={() => loadData()}>Start</button>
      }
      {
        latestItem && 
        <div>
          <h2>{latestItem.label}</h2>
          <p>{latestItem.question}</p>
          <button onClick={() => handleBack()}>Zurück</button>
        </div>
      }
      {
        latestItem && latestItem.children.map((item, key) => 
          <div key={key}>
            <button onClick={() => handleClick(item)}>{item.label}</button>
          </div>
        )
      }
    </div> 
  )
}

export default App
