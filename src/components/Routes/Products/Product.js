import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    margin: 10px;
    border: 1px solid black;
    border-radius: 5px;
    width: 300px;
`

const Title = styled.h5`
    align-self: center;

    position: relative;
    z-index: 1;
    &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -10px;
        height: 1px;
        width: 80%;
        border-bottom: 3px solid #FFE60A;
    }
`

const Img = styled.div`
    display: flex;
    align-self: center;

    background-image: url("assets/images/farbeimer.jpg"); 
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 80%;
    height: 100px;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    margin: 30px 0 30px 0;
    margin-left: 5%;
`

const CategoryWrapper = styled.div`
    display: flex;
    margin-bottom: -10px;
    align-self: flex-start;
`

const CategoryText = styled.p`
    font-weight: bold;
    font-size: 13px;
    margin-right: 10px;
`

const ValueText = styled.p`
    font-size: 13px;
`

const linkStyling = {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    textDecoration: 'none',
    height: '25px',
    width: '60%',
    alignItems: 'center',
    backgroundColor: '#ffe60a',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '7px',
    marginBottom: '10px',
    marginTop: '10px'
}  

const ButtonText = styled.p`
    margin-right: 10px;
    color: black;
    font-weight: bold;
    font-size 14px;
`

const Product = ({ title, category, surface, application, lifetime, gloss_level, binder, solublity, id}) => {
    return (
        <Wrapper>
            <Title>{title}</Title>
            <Img />
            <ContentWrapper>
        	    <CategoryWrapper>
                    <CategoryText>Kategorie: </CategoryText>
                    <ValueText>{category}</ValueText>
                </CategoryWrapper>
                <CategoryWrapper>
                    <CategoryText>Bindemittel: </CategoryText>
                    <ValueText>{binder}</ValueText>
                </CategoryWrapper>
                <CategoryWrapper>
                    <CategoryText>Lebensdauer: </CategoryText>
                    <ValueText>{lifetime[0]} - {lifetime[1]} Jahre</ValueText>
                </CategoryWrapper>
                <CategoryWrapper>
                    <CategoryText>Oberflächen: </CategoryText>
                    <ValueText>{surface}</ValueText>
                </CategoryWrapper>
            </ContentWrapper>
            <Link 
                    to={`/product/${id + 1}`}
                    style={linkStyling}
                >
                    <ButtonText>Ansehen</ButtonText>
                    <img 
                        src="assets/icons/misc/right.png"
                        style={{"height": "20px", "width": "20px", "margin": "5px"}}
                        alt="BackButton"
                    />
            </Link>
        </Wrapper>
    )
}

export default Product