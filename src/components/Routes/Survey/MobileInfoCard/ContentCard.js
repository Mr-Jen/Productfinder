import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    background-color: rgb(230, 230, 230);
    /*#F1F2F6*/
    height: 100%;
    width: 100%;
    border-radius: 2em 2em 0 0;
    border: ${props => props.warn ? "4px solid #ba1616" : "1px solid white"};
    margin: 2em 1em 1em 1em;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const Header = styled.div`
    position: fixed;
    width: 90%;
    border-radius: 2em 2em 0 0;
`

const ContentWrapper = styled.div`
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 75px;
    height: 100%;
`

const ContentTitle = styled.h4`

`

const ImageWrapper = styled.div`
    background-image: url(${props => props.imgSrc});
    background-size: cover;
    background-position: center;
    width: 90%;
    min-height: 70%;
    border-radius: 10px;
`

const ContentText = styled.p`
    width: 90%;
    font-size: 14px;
    text-align: left;
    letter-spacing: .04em;
    line-height: 20px;
`

function ContentCard({ content }) {
    console.log(content?.warning)

    return (
        <Wrapper warn={content?.warning}>
            <Header>
                <ContentTitle>{content.title}</ContentTitle>
            </Header>
            <ContentWrapper>
                <ImageWrapper imgSrc={content.image}/>
                <ContentText>{content.content}</ContentText>
            </ContentWrapper>
        </Wrapper>
    )
}

export default ContentCard
