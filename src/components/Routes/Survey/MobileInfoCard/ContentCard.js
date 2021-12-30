import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    background-color: rgb(230, 230, 230);
    /*#F1F2F6*/
    height: 100%;
    width: 100%;
    border-radius: 1.5em 1.5em 0 0;
    //border: ${props => props.warn ? "4px solid #ba1616" : "1px solid orange"};
    margin: 1.75em .75em .75em .75em;

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
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 75px;
    height: 100%;
    width: 90%;
    padding: .5em;
    padding-top: 0;
    margin-bottom: 1em;
`

const ContentTitle = styled.h4`

`

const ImageWrapper = styled.div`
    background-image: url(${props => props.imgSrc});
    background-size: cover;
    background-position: center;
    min-height: 70%;
    border-radius: 10px;
    width: 100%;
`

const ContentText = styled.p`
    font-size: 14px;
    text-align: left;
    letter-spacing: .04em;
    line-height: 20px;
`

const InstructionsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-left: 3px solid grey;
    margin: .7em;
`

const ItemWrapper = styled.div`
    padding: .5em;
    margin-left: .5em;
`

const Item = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 0;
`  

const Icon = styled.img`
    max-width: 20px;
    max-height: 20px;
`

const ItemText = styled.p`
    font-size: 14px;
    text-align: start;
    margin: -1px .5em .5em .5em;
    line-height: 25px;
`

const Option = styled.div`
    display: flex;
`

function ContentCard({ content }) {
    let instr = content?.instructions;

    return (
        <Wrapper warn={content?.warning}>
            <Header>
                <ContentTitle>{content.title}</ContentTitle>
            </Header>
            <ContentWrapper>
                <ImageWrapper imgSrc={content.image}/>
                <ContentText>{content.content}</ContentText>
                {instr &&
                    <InstructionsWrapper>
                        {
                            Object.keys(instr).map((item, key) => {
                                return <ItemWrapper key={key}>
                                    <Item>
                                        <Icon src={`assets/icons/misc/${key+1}.svg`}/>
                                        <ItemText style={{fontWeight: "bold"}}>{instr[item].title}</ItemText>
                                    </Item>
                                    {instr[item]?.options &&
                                        Object.keys(instr[item].options).map((index, key) => {
                                            return <Option key={key}>
                                                <Icon src="assets/icons/misc/right.png"/>
                                                <ItemText>{instr[item].options[index]}</ItemText>
                                            </Option>
                                        })
                                    }
                                </ItemWrapper>
                            })
                        }
                    </InstructionsWrapper>
                }
            </ContentWrapper>
        </Wrapper>
    )
}

export default ContentCard
