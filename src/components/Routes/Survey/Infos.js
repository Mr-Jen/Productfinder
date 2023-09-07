import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const ToProducts = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #FFE60A;
    border-radius: 5px;
    cursor: pointer;
    margin: 2em 0 2em 0;
`

const Text = styled.p`
    font-weight: bold;
    font-size: 15px;
`

const Icon = styled.img`
    height: 2em;
    padding: 1em;
`

const Title = styled.h2`
    text-align: center;
    position: relative;
    &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -10px;
        height: 1px;
        width: 80%;
        border-bottom: 3px solid #FFE60A;
    }

    @media (max-width: 600px) {
        font-size: 16px;
    }

    @media (max-width: 450px) {
        &:before {
            content: none;
        }
        border-top: 2px solid #FFE60A;
        border-bottom: 2px solid #FFE60A;
        padding: 1em;
        &:empty {
            border: none;
        }
    }
`

const Infos = ({latestItem}) => {
    let returnValue;

     if (latestItem && latestItem.children === "no-products"){
        returnValue = <a href="https://schwedischer-farbenhandel.de">Homepage</a>
    }

    return (
        <Wrapper>
            <Title>{latestItem?.label}</Title>
            <h4 style={{textAlign: "center", lineHeight: "20px"}}>{latestItem?.question}</h4>
            {latestItem && latestItem.children === null &&
                <Link 
                    to={"/products"}
                    style={{textDecoration: "none"}}
                >                
                    <ToProducts>
                        <Icon src="assets/icons/misc/paint-bucket.png"/>
                        <Text>Zu den Produkten</Text>
                        <Icon style={{height: '1.5em'}} src="assets/icons/misc/next.svg"/>
                    </ToProducts>
                </Link>
            }
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