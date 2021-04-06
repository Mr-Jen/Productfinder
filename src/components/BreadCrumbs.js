import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { removeFromHistory } from '../actions/history'

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

const BreadCrumbs = ({handleNavigationChange, breadCrumbs}) => {
    return (
        <BreadCrumbWrapper>
            {       
                breadCrumbs.forEach((crumb, index) => {
                    return <BreadCrumb onClick={() => handleNavigationChange(index+1)} key={index}>{`${crumb}   -->`}</BreadCrumb>
                })
            }
        </BreadCrumbWrapper>
    )
}

const mapStateToProps = ({decisions, history}) => {
    let latestItem = decisions
    let childrenItems = null
    let breadCrumbs = []
    history.forEach (itemId => {
        latestItem = childrenItems ? childrenItems[itemId] : latestItem[itemId]
        breadCrumbs.push(latestItem.label)
        childrenItems = latestItem.children
    })
  
    return {
      breadCrumbs
    }
}

const mapDispatchToProps = dispatch => ({
    handleNavigationChange : index => dispatch(removeFromHistory(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumbs)
