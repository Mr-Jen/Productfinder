import React, {useEffect, useState } from 'react'
import './rangeslider.css'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fafafa;
    border: 1px solid #f1f1f1;
    border-radius: 10px;
    padding: 1em 1em 0 1em;
    @media (max-width: 1000px){
        margin-bottom: 2em;
    }
`

const Marker = styled.div`
    /*border-radius: 50px;
    height: 5px;
    background-color: grey;
    width: 5px;*/
`

const DotWrapper = styled.div`
    display: flex;
    width: 95%;
    margin-left: 5px;
    //border: 1px solid red;
    justify-content: space-between;
`

const RangeSlider = ({ handleOnSlide }) => {  
    const [rendered, setRendered] = useState(false);
    const [valueOne, setValueOne] = useState(0);
    const [valueTwo, setValueTwo] = useState(100); 
    const sliderTrackRef = React.useRef();

    let minGap = 10;  
    let sliderMaxValue = 100;
    let sliderStep = 10;
        
    function fillColor(){
        let percent1 = (valueOne / sliderMaxValue) * 100;
        let percent2 = (valueTwo / sliderMaxValue) * 100;
        sliderTrackRef.current.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
        //console.log(sliderTrackRef.current.style.background)
    }

    if(rendered){
        sliderTrackRef.current.style.background = "#dadae5"
    }

    const setOne = (event) => {
        let target = parseInt(event.target.value)
        if(target <= (valueTwo - minGap) && target !== valueOne){
            setValueOne(target)
            fillColor();
        }
    }

    const setTwo = (event) => {
        //console.log(event.target.value, valueOne + minGap)
        let target = parseInt(event.target.value)
        if(target >= (valueOne + minGap) && target !== valueTwo){
            setValueTwo(target)
        }  
    }

    useEffect(() => {
        setRendered(true);
    }, [])

    useEffect(() => {
        handleOnSlide([valueOne, valueTwo])
    }, [valueOne, valueTwo])

    return (
        <Wrapper>
            <strong style={{textAlign: "center", fontSize: "16px"}}>Glanzgrad in %</strong>
            <div className="wrapper">
                <div className="values_wrapper">
                    <input className="slider_value" step={10} min={0} onChange={(e) => setOne(e)} type="number" value={valueOne}/>
                    <input className="slider_value" max={100} step={10} onChange={(e) => setTwo(e)} type="number" value={valueTwo}/>
                </div>
                <div className="container">
                    <div ref={sliderTrackRef} className="slider-track">
                        <DotWrapper>
                            {[...Array(sliderMaxValue / sliderStep)].map((el, index) => <Marker key={index}/>)}
                        </DotWrapper>
                    </div>
                    <input type="range" min="0" max="100" step={sliderStep} value={valueOne} id="slider-1" onChange={(event) => setOne(event)} />
                    <input type="range" min="0" max="100" step={sliderStep} value={valueTwo} id="slider-2" onChange={(event) => setTwo(event)} />
                </div>                
            </div>
        </Wrapper>
    )
}

export default RangeSlider
