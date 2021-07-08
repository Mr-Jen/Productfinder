import React from 'react'
import styled from 'styled-components'

const CompTitle = styled.h2`
    position: relative;
    z-index: 1;
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

const Title = ({ contentText }) => {
    return (
        <div>
            <CompTitle>{contentText}</CompTitle>
        </div>
    )
}

export default Title
