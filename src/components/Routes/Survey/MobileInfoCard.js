import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    background-color: orange;
    width: 100vw;
    border-radius: 10px 10px 0 0;
    position: absolute;
    height: 60vh;
    bottom: 0;
`

const MobileInfoCard = () => {
    const handleStart = () => {
        console.log("TOUCHSTART")
    }

    const handleEnd = () => {
        console.log("TOUCHEND")
    }

    const handleCancel = () => {
        console.log("TOUCHCANCEL")
    }

    const handleMove = () => {
        console.log("TOUCHMOVE")
    }

    React.useEffect(() => {
        window.addEventListener("touchstart", handleStart, false);
        window.addEventListener("touchend", handleEnd, false);
        window.addEventListener("touchcancel", handleCancel, false);
        window.addEventListener("touchmove", handleMove, false);
    }, [])
    return (
        <Wrapper>
            123
        </Wrapper>
    )
}

export default MobileInfoCard
