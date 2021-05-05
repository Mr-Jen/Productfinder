import React from 'react'
import styled, {keyframes } from 'styled-components'

const Wrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFE60A;
    border: 1px solid grey;
    border-radius: 10px;
    min-height: 40vh;
    width: 60vw;
    z-index: 2;

    display: flex;
    justify-content: center;
`

const CardAnimationKeyFrame = keyframes`
    0% {transform:translate(-100px)}
    100% {}
`

const CardWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    width: 80%;
    margin: 2% 4% 2% 4%;


    /*animation: ${CardAnimationKeyFrame} 3s 2;*/
    animation-direction: left;
`


const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /*background-color: green;*/
    width: 50%;
    margin-right: 5%;
`

const TitleWrapper = styled.div`
`

const Title = styled.h3`
    padding-bottom: 10px;
    display: inline-block;
    border-bottom: 2px solid black;
`

const Text = styled.p`
    line-height: 30px;
`

const ImageWrapper = styled.div`
    background-image: url(${props => props.imgSrc});
    background-size: cover;
    width: 50%;
    height: 80%;
    align-self: center;
    border-radius: 10px;
`

const Arrow = styled.img`
    align-self: center;
    cursor: pointer;
    :hover {
        transform: translateX(${props => props.side === 0 ? "-10px" : "10px"}) ${props => props.rotate_angle && `rotate(180deg)`};
    }
    transform: ${props => props.rotate_angle && `rotate(180deg)`};
`

const InfoCard = ({ data }) => {
    const [infoState, setInfoState] = React.useState(0);
    
    const onClickNextCard = (e) => {
        console.log("NEXT CARD")
        if (e === 0){
            if (infoState === 0){
                setInfoState(Object.keys(data).length - 1);
            }
            else {
                setInfoState(infoState - 1);
            }
        }   
        else if (e === 1){
            if (infoState === Object.keys(data).length -1){
                setInfoState(0);
            }
            else {
                setInfoState(infoState + 1);
            }
        }
    }

    let default_content = {
        "title": "PLACEHOLDER",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "image": "assets/images/öl.jpg"
    }

    return (
        <Wrapper>
            <Arrow 
                onClick={() => onClickNextCard(0)} 
                hidden={data ? Object.keys(data).length === 1 : true} 
                height="70" src="assets/arrow.svg"
                side={0}
                rotate_angle={true}
            />
            <CardWrapper>
                <ContentWrapper>
                    <TitleWrapper>
                        <Title>{data ? data[infoState]["title"] : default_content["title"]}</Title>
                    </TitleWrapper>
                    <Text>{data ? data[infoState]["content"] : default_content["content"]}</Text>
                </ContentWrapper>
                <ImageWrapper imgSrc={data ? data[infoState]["image"] : default_content["image"]}/>
            </CardWrapper>
            <Arrow 
                onClick={() => onClickNextCard(1)} 
                hidden={data ? Object.keys(data).length === 1 : true} 
                height="70" src="assets/arrow.svg"
                side={1}
            />
        </Wrapper>
    )
}

export default InfoCard
