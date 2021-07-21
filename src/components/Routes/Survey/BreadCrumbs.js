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

const Arrow = styled.img`
    height: 1em;
    margin-right: -.8em;
`

const BreadCrumb = styled.button`
  padding: 0 1em 0 1em;
  padding-left: ${props => props.isOffset && "-1em"};
  border: none;
  background: none;
  /*color: ${props => props.lastCrumb ? 'blue' : 'black'};*/
  color: rgb(69, 116, 209);
  font-size: ${props => props.lastCrumb ? '15px' : '14px'};
  font-weight: ${props => props.lastCrumb && 'bold'};
  cursor: ${props => props.lastCrumb ? 'auto' : 'pointer'};
  margin: 3px;
  &:hover {
    color: #01447e;
    text-decoration: ${props => !props.lastCrumb && 'underline'};;
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
                //console.log("IS OFFSET")
                setIsOffset(true);
            }
            else {
                //console.log("NO OFFSET")
                isOffset === true && setIsOffset(false);
            }
        }
    }, [breadCrumbs])

    return (
        <Wrapper isOffset={isOffset}>
            { (!isOffset && breadCrumbs.length > 1) ?
                <BreadCrumbWrapper ref={bcRef}>
                {       
                    breadCrumbs.map((crumb, index) => (
                        <BreadCrumbInnerWrapper key={index} id={`crumb${index}`}>
                            <BreadCrumb 
                                onClick={() => index !== breadCrumbs.length -1 && handleNavigationChange(index+1)}
                                lastCrumb={index + 1 === breadCrumbs.length}
                            >
                                {`${crumb}`}
                            </BreadCrumb>
                            {/*index + 1 !== breadCrumbs.length && <strong>{"ᐳ"}</strong>*/}
                            {index + 1 !== breadCrumbs.length && <strong>{"/"}</strong>}
                        </BreadCrumbInnerWrapper>
                    ))
                }
                </BreadCrumbWrapper>
            :
                <BreadCrumbInnerWrapper onClick={() => handleNavigationChange(breadCrumbs.length-1)}>
                    {/*breadCrumbs.length > 0 && <strong>ᐸ</strong>*/}
                    {breadCrumbs.length > 0 && <Arrow src="assets/icons/misc/left-arrow.png"></Arrow>}
                    <BreadCrumb                        
                        lastCrumb={true}
                    >
                        {breadCrumbs[breadCrumbs.length-2]}
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
