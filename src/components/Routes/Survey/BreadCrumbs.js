import React, {useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { removeFromHistory } from '../../../actions/history'

const Wrapper = styled.div`
    display: flex;
    justify-content: ${props => props.isOffset ? "flex-start" : "flex-start"};
    width: 100%;
`

const BreadCrumbWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const BreadCrumbInnerWrapper = styled.div`
    display: flex;
    align-items: center;
`

const BreadCrumb = styled.button`
  padding: 0 1em 0 1em;
  padding-left: ${props => props.isOffset && "-1em"};
  border: none;
  background: none;
  color: ${props => props.lastCrumb ? 'blue' : 'black'};
  font-size: ${props => props.lastCrumb ? '15px' : '14px'};
  font-weight: ${props => props.lastCrumb && 'bold'};
  cursor: pointer;
  margin: 3px;
  &:hover {
    color: #01447e;
    text-decoration: underline;
  }
`

const BreadCrumbs = ({handleNavigationChange, breadCrumbs}) => {
    const bcRef = useRef();
    const [isOffset, setIsOffset] = useState(false);

    useEffect(() => {
        let firstElem = document.getElementById("crumb0");
        let secondElem = document.getElementById(`crumb${breadCrumbs.length-1}`);
        if(firstElem && secondElem){
            if (firstElem.getBoundingClientRect().y !== secondElem.getBoundingClientRect().y) {
                console.log("IS OFFSET")
                setIsOffset(true);
            }
            else {
                console.log("NO OFFSET")
                isOffset === true && setIsOffset(false);
            }
        }
    }, [breadCrumbs])

    useEffect(() => {
        console.log("OFFSET STATE: ", isOffset)
    }, [isOffset])

    return (
        <Wrapper isOffset={isOffset}>
            { (!isOffset && breadCrumbs.length > 1) ?
                <BreadCrumbWrapper ref={bcRef}>
                {       
                    breadCrumbs.map((crumb, index) => (
                        <BreadCrumbInnerWrapper key={index} id={`crumb${index}`}>
                            <BreadCrumb 
                                onClick={() => handleNavigationChange(index+1)}
                                lastCrumb={index + 1 === breadCrumbs.length}
                            >
                                {`${crumb}`}
                            </BreadCrumb>
                            {index + 1 !== breadCrumbs.length && <strong>{"ᐳ"}</strong>}
                        </BreadCrumbInnerWrapper>
                    ))
                }
                </BreadCrumbWrapper>
            :
                <BreadCrumbInnerWrapper>
                    {breadCrumbs.length > 0 && <strong>ᐸ</strong>}
                    <BreadCrumb 
                        onClick={() => handleNavigationChange(breadCrumbs.length-1)}
                        lastCrumb={true}
                    >
                        {breadCrumbs[breadCrumbs.length-1]}
                    </BreadCrumb>
                </BreadCrumbInnerWrapper>                
            }
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
