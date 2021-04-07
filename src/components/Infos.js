import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import NavigateButton from './NavigateButton'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Infos = ({latestItem}) => {
    return (
        <Wrapper>
            <h3>{latestItem?.label}</h3>
            <h5>{latestItem?.question}</h5>
            {(latestItem && latestItem.children === null) && 
                <NavigateButton 
                    location={"/products"} 
                    text={"Weiter zur Produktempfehlung"}
                    direction={"right"}
                />
            }
        </Wrapper>
    )
}

const mapStateToProps = ({decisions, history}) => {
    let latestItem = decisions
    let childrenItems = null
    history.forEach (itemId => {
        latestItem = childrenItems ? childrenItems[itemId] : latestItem[itemId]
        childrenItems = latestItem.children
    })
  
    return {
      latestItem
    }
}

export default connect(mapStateToProps, null)(Infos)
