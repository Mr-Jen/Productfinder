import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { removeFromHistory } from '../../actions/history'
import './header.css'

const Wrapper = styled.div`
    display: flex; 
    justify-content: space-between;
    align-items: center;
    width: 100vw;

    /*border-bottom: 1px solid rgb(223, 227, 235); */
    background-color: white;   

    position: sticky;
    top: 0;
    padding: 1em 2em 1em 2em;
`

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
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

function Header({ handleNavigationChange }) {
    React.useEffect(() => {
        window.addEventListener('scroll',(e)=>{
            const wrapper = document.getElementById('wrapper');
            if(window.pageYOffset>0){
                wrapper.classList.add("add-shadow");
            } else{
                wrapper.classList.remove("add-shadow");
            }
        });
    }, [])

    return (
        <Wrapper id="wrapper">
            <Link 
                to="/" 
                style={{textDecoration: "none"}}
                onClick={() => handleNavigationChange(0)}
            >
                <TitleWrapper>
                    <Icon id="icon" src="/assets/icons/home/Brush-Search.svg"/>
                    <Title /*onClick={() => handleNavigationChange(0)}*/>
                        <h1 style={{"letterSpacing": "1.5px"}}>Produktfinder</h1>
                    </Title>
                </TitleWrapper>
            </Link>
            <a href="https://www.schwedischer-farbenhandel.de/">
                <Icon src="/assets/icons/logo.jpg"/>
            </a>            
        </Wrapper>
    )
}

const mapDispatchToProps = dispatch => ({
    handleNavigationChange : index => dispatch(removeFromHistory(index))
})

export default connect(null, mapDispatchToProps)(Header)
