import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    overflow: hidden;
    overflow: -moz-hidden-unscrollable;
    /*background: url(assets/icons/misc/dropdown-arrow.svg) no-repeat right black;*/
    display: inline-block;
    position: relative;
`

const Selector = styled.select`
    padding: .6em;
    border-radius: 5px;
    border: 2px solid black;
`

const Option = styled.option`
    margin: 4em;
    height: 50px;
`

function Select({ handleChangeSort }) {
    const onChangeSort = () => {
        let d = document.getElementById("sortBy").value;
        handleChangeSort(d)
    }

    return (
        <Wrapper>
            <Selector name="sort" id="sortBy" onChange={() => onChangeSort()}>
                <Option value="">Sortieren nach...</Option>
                <Option value="gloss_low">Glanzgrad Niedrig</Option>
                <Option value="gloss_high">Glanzgrad hoch</Option>
                <Option value="lifetime_low">Standzeit Niedrig</Option>
                <Option value="lifetime_high">Standzeit Hoch</Option>
            </Selector>
        </Wrapper>
    )
}

export default Select
