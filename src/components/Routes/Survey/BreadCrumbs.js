import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { removeFromHistory } from '../../../actions/history'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-left: 10px;
`

const BreadCrumbWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`

const BreadCrumb = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: ${props => props.lastCrumb ? 'blue' : 'black'};
  font-size: ${props => props.lastCrumb ? '15px' : '14px'};
  font-weight: ${props => props.lastCrumb && 'bold'};
  cursor: pointer;
  margin: 3px;

`

const BreadCrumbs = ({handleNavigationChange, breadCrumbs}) => {
    return (
        <Wrapper>
            <BreadCrumbWrapper>
                {       
                    breadCrumbs.map((crumb, index) => (
                        <BreadCrumb 
                            onClick={() => handleNavigationChange(index+1)} key={index}
                            lastCrumb={index + 1 === breadCrumbs.length}
                        >
                            {`${crumb} --> `}
                        </BreadCrumb>
                    ))
                }
            </BreadCrumbWrapper>
        </Wrapper>
    )
}

const mapStateToProps = ({decisions, history}) => {
    let latestItem = decisions
    let childrenItems = null
    let breadCrumbs = []
    history.forEach (itemId => {
        latestItem = childrenItems ? childrenItems[itemId] : latestItem[itemId]
        breadCrumbs.push(latestItem?.breadcrumb ? latestItem.breadcrumb : latestItem?.label)
        childrenItems = latestItem?.children
    })
  
    return {
      breadCrumbs
    }
}

const mapDispatchToProps = dispatch => ({
    handleNavigationChange : index => dispatch(removeFromHistory(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumbs)
