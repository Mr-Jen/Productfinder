import React from 'react'
import styled, {keyframes } from 'styled-components'
import { connect } from 'react-redux'

import { addToWarnings, removeFromWarnings } from '../../../actions/warning'
import DetailImage from './DetailImage'

const Wrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFE60A;
    border-radius: 10px;
    border: ${props => props.warn ? "4px solid red" : "1px solid grey"};
    height: 60vh;
    width: 90vw;
    max-width: 1400px;
    z-index: 10000000;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media (min-width: 1200px){
        min-height: 50vh;
        height: calc(0.5 * 50vw);
    }

    /*@media (max-width: 800px){
        height: 50vh;
    }

    @media (max-width: 600px) {
        position: absolute;        
        bottom: 0;
        height: 50vh;
        overflow-y: scroll;
        top: auto;
        margin-top: 20vh;
    }*/
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
    overflow-y: auto;
    padding-right: 1em;
`

const ImageWrapper = styled.div`
    background-image: url(${props => props.imgSrc});
    background-size: cover;
    width: 50%;
    height: 100%;
    align-self: center;
    border-radius: 10px;
    cursor: zoom-in;

    @media (max-width: 800px){
        height: 70%;
    }
`

const Arrow = styled.img`
    align-self: center;
    cursor: pointer;
    :hover {
        transform: translateX(${props => props.side === 0 ? "-10px" : "10px"}) ${props => props.rotate_angle && `rotate(180deg)`};
    }
    transform: ${props => props.rotate_angle && `rotate(180deg)`};
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
`

const Img = styled.img`
    height: 40px;
    width: 40px;
    position: absolute;
    right: 0;
    top: 0;
    border: 1px solid black;
    cursor: pointer;
`

const InnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
`

const PointNav = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const Dot = styled.span`
    color: ${props => props.active ? "black" : "grey"};
    display: inline-block;
    font-size: 35px;
    width: 25px;
    cursor: pointer;
`


const InfoCard = ({ data, warningIds, onAgree, AddInfoId, RemoveInfoId, onClose }) => {
    const [infoState, setInfoState] = React.useState(0);
    const [showEnlarged, setShowEnlarged] = React.useState(false);

    //console.log("IS DATA AND INFO?: ", data)
    let slideLength = Object.keys(data).length;
    
    const onClickNextCard = (e) => {
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
        "image": "assets/images/Öl/öl.jpg"
    }

    return (
        <Wrapper warn={(data && data[infoState]?.warning) && (data[infoState]["warning"])}>
            <InnerWrapper>
                <Arrow 
                    onClick={() => onClickNextCard(0)} 
                    hidden={data ? Object.keys(data).length === 1 : true} 
                    height="70" src="assets/icons/misc/arrow.svg"
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
                    <ImageWrapper onClick={() => setShowEnlarged(true)} imgSrc={data ? data[infoState]["image"] : default_content["image"]}/>
                </CardWrapper>
                <Arrow 
                    onClick={() => onClickNextCard(1)} 
                    hidden={data ? Object.keys(data).length === 1 : true} 
                    height="70" src="assets/icons/misc/arrow.svg"
                    side={1}
                />
                {showEnlarged &&
                    <div>
                        <DetailImage onClickClose={() => setShowEnlarged(false)} imageSrc={data ? data[infoState]["image"] : default_content["image"]}/>
                    </div>
                }
            </InnerWrapper>
            <PointNav>
                    {
                        [...Array(slideLength)].map((e, i) => {
                            return <Dot onClick={() => setInfoState(i)} key={i} active={i === infoState}>&#8226;</Dot>
                        })
                    }
            </PointNav>
            <Img src="assets/icons/misc/close-light-bg.svg" onClick={() => onClose()}/>
        </Wrapper>
    )
}

const mapStateToProps = ({ warning }) => {
    return {
        warningIds: warning
    }
}

const mapDispatchToProps = dispatch => ({
    AddInfoId : itemId => dispatch(addToWarnings(itemId)),
    RemoveInfoId: itemId => dispatch(removeFromWarnings(itemId))
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoCard)
