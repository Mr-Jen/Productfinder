import React from 'react'
import styled from 'styled-components'

const CardWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: yellow;
    border: 1px solid black;
    border-radius: 10px;
    height: 40vh;
    width: 50vw;
    z-index: 2;

    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 2 1;
    justify-content: flex-end;
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const ImageWrapper = styled.div`
    display: flex;
    margin-right: 10px;
    background-image: url('assets/images/lasur.png');
    background-size: contain;
    height: 90%;
    width: 40%;
    border-radius: 10px;
`

const InfoCard = ({ data }) => {
    return (
        <CardWrapper>
            <ContentWrapper>
                <h3>{data.label}</h3>
                <p>Content</p>
            </ContentWrapper>
            <ImageWrapper/>
        </CardWrapper>
    )
}

export default InfoCard
