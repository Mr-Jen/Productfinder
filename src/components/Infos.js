import React from 'react'
import { connect } from 'react-redux'

const Infos = ({latestItem}) => {
    return (
        <div>
            <h3>{latestItem.label}</h3>
            <h5>{latestItem.question}</h5>
        </div>
    )
}

const mapStateToProps = ({decisions, history}) => {
    let latestItem = decisions
    let childrenItems = null
    history.map (itemId => {
        latestItem = childrenItems ? childrenItems[itemId] : latestItem[itemId]
        childrenItems = latestItem.children
    })
  
    return {
      latestItem
    }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Infos)
