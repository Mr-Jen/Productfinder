import React from 'react'
import styled from 'styled-components'

const CompTitleH2 = styled.h2`
    text-align: center;
    z-index: -100;
    position: relative;
    &:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: -10px;
        height: 1px;
        width: 80%;
        border-bottom: 4px solid #FFE60A;
    }
`

const CompTitleH4 = styled.h4`
    text-align: center;
    z-index: -100;
    position: relative;
    &:before {
        content: "";
        position: absolute;
        bottom: -10px;
        height: 1px;
        width: 80%;
        border-bottom: 4px solid #FFE60A;
    }
`

const Title = ({ contentText, size }) => {
    return (
        <>
            {
                size === "h4" ?
                    <CompTitleH4>{contentText}</CompTitleH4>
                : <CompTitleH2>{contentText}</CompTitleH2>
            }
        </>
    )
}

export default Title
