import React from 'react'
import styled from 'styled-components'

const ImageWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    min-height: 60vh;
    width: 60vw;
    z-index: 2;
    cursor: zoom-out;

    background-image: url(${props => props.imgSrc});
    background-size: cover;

    display: flex;
    justify-content: flex-end;
`

const DetailImage = ({ imageSrc, onClickClose }) => {
    return (
        <>
            <ImageWrapper imgSrc={imageSrc} onClick={() => onClickClose()}>
                <img 
                    alt="close-img-icon" 
                    height="45px" 
                    onClick={() => onClickClose()} src="assets/icons/misc/close-light-bg.svg"
                    style={{cursor: "pointer"}}
                />    
            </ImageWrapper>
        </>
    )
}

export default DetailImage
