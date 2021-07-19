import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { removeFromHistory } from '../../actions/history'

const Wrapper = styled.div`
    display: flex; 
    justify-content: space-between;
    align-items: center;
    width: 90vw;

    /*border-bottom: 1px solid rgb(223, 227, 235); */
    background-color: white;   
    margin-bottom: 2em;

    position: sticky;
    top: 0;

    box-shadow: 0px 7px 5px -1px rgba(141,141,141,0.15);
    -webkit-box-shadow: 0px 7px 5px -1px rgba(141,141,141,0.15);
    -moz-box-shadow: 0px 7px 5px -1px rgba(141,141,141,0.15);
`

const Title = styled.button`
    display: flex;
    align-self: flex-start;
    padding: 0;
    border: none;
    background: none;
    @media (max-width: 600px) {
        font-size: 10px;
    }
    @media (max-width: 500px) {
        font-size: 8px;
    }
`

const Icon = styled.img`
    height: 3em;
    @media (max-width: 500px){
        height: 2em;
    }
`

function Header({handleNavigationChange}) {
    return (
        <Wrapper>
            <Title onClick={() => handleNavigationChange(0)}>
                <h1 style={{"letterSpacing": "1.5px"}}>Produktfinder</h1>
            </Title>
            <a href="https://www.schwedischer-farbenhandel.de/">
                <Icon src="assets/icons/logo.jpg"/>
            </a>            
        </Wrapper>
    )
}

const mapDispatchToProps = dispatch => ({
    handleNavigationChange : index => dispatch(removeFromHistory(index))
})

export default connect(null, mapDispatchToProps)(Header)
