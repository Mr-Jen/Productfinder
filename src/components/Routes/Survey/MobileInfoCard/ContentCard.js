import React from 'react'
import styled from 'styled-components'

import Title from '../../../Shared/Title'

const Wrapper = styled.div`
    background-color: rgb(230, 230, 230);
    height: 100%;
    width: 100%;
    border-radius: 2em 2em 0 0;
    margin: 1em;

    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    overscroll-behavior: auto
`

const Header = styled.div`
    position: fixed;
    width: 90%;
    background-color: rgb(230, 230, 230);
    border-radius: 2em 2em 0 0;
`

const ContentTitle = styled.h4`

`

const ImageWrapper = styled.div`
    background-image: url(${props => props.imgSrc});
    background-size: cover;
    width: 90%;
    min-height: 50%;
    border-radius: 10px;
    margin-top: 75px;
`

const ContentText = styled.p`
    width: 90%;
    font-size: 14px;
    text-align: left;
    letter-spacing: .04em;
    line-height: 20px;
`

function ContentCard({ content }) {
    return (
        <Wrapper>
            {/*<Title contentText={content.title} size={"h4"}/>*/}
            <Header>
                <ContentTitle>{content.title}</ContentTitle>
            </Header>
            <ImageWrapper imgSrc={content.image}/>
            <ContentText>{content.content}</ContentText>
        </Wrapper>
    )
}

export default ContentCard
