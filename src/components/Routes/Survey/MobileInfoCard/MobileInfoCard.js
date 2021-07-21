import React from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import "./styles.css";
import ContentCard from './ContentCard';

const Wrapper = styled.div`
    /*background-color: orange;*/
    background-color: white;
    width: 100vw;
    border-radius: 2em 2em 0 0;
    position: fixed;
    height: 60vh;
    left: 0;
    bottom: 0;

    display: flex;
    flex-direction: column;
    z-index: 1000000;

    @media (min-width: 400px){
        height: 70vh;
    }
    @media (min-width: 500px){
        height: 80vh;
    }
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Hr = styled.hr`
    margin-left: 0;
    margin-right: 0;
    border: 1px solid rgb(223, 223, 223);
`

const PointNav = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const Dot = styled.span`
    color: ${props => props.active ? "black" : "#FFE60A"};
    display: inline-block;
    font-size: 35px;
    width: 25px;
`

const CloseIcon = styled.img`
    height: 20px;
    padding: 1.2em;
`

const MobileInfoCard = ({ closeCard, data }) => {
    const [slide, setSlide] = React.useState(0);
    const slideLength = Object.keys(data).length;

    const onSlide = (e) => {
        setSlide(e.activeIndex)
    }

    return (
        <Wrapper>
            <Header>
                <CloseIcon style={{visibility: 'hidden'}} onClick={() => closeCard()} src="/assets/icons/misc/close.png"></CloseIcon>
                <PointNav>
                    {
                        [...Array(slideLength)].map((e, i) => {
                            return <Dot key={i} active={i === slide}>&#8226;</Dot>
                        })
                    }
                </PointNav>
                <CloseIcon onClick={() => closeCard()} src="/assets/icons/misc/close.png"></CloseIcon>
            </Header>
            <Hr/>
            <Swiper 
                className="mySwiper"       
                onSlideChange={(e) => onSlide(e)}>
                {
                    Object.keys(data).map((e, i) => {
                        return <SwiperSlide key={i}>
                            <ContentCard content={data[i]}/>
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </Wrapper>
    )
}

export default MobileInfoCard
