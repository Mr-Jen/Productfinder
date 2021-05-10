import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import NavigateButton from '../../Shared/NavigateButton'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Infos = ({latestItem}) => {
    let returnValue;

    if (latestItem && latestItem.children === null) {
        returnValue = <NavigateButton 
            location={"/products"} 
            text={"Weiter zur Produktempfehlung"}
            direction={"right"}
        />
    } else if (latestItem && latestItem.children === "no-products"){
        returnValue = <a href="https://schwedischer-farbenhandel.de">Homepage</a>
    }

    return (
        <Wrapper>
            <h3>{latestItem?.label}</h3>
            <h5>{latestItem?.question}</h5>
            {returnValue}
        </Wrapper>
    )
}

const mapStateToProps = ({decisions, history}) => {
    let latestItem = decisions
    let childrenItems = null
    history.forEach (itemId => {
        latestItem = childrenItems ? childrenItems[itemId] : latestItem && latestItem[itemId]
        childrenItems = latestItem?.children
    })
  
    return {
      latestItem
    }
}

export default connect(mapStateToProps, null)(Infos)
