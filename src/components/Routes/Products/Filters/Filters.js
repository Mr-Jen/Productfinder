import React, {useState} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { changeSurface, changeApplication, resetSurfaces, resetApplications } from '../../../../actions/filter'
import Filter from './Filter'
import Select from './Select'
import RangeSlider from '../RangeSlider/RangeSlider'

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    margin-bottom: 10px;
    margin-top: 2em;
    justify-content: space-around;
    //border: 1px solid black;

    @media (max-width: 1300px){
        width: 90%;
    }

    @media (max-width: 1000px) {
        width: 80%;
        flex-wrap: wrap-reverse;
    }

    @media (max-width: 700px) {
        width: 90%;
    }
    @media (max-width: 580px) {
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 25rem;
    }
`


const Filters = ({ filter, onChangeApplication, onChangeSurface, onResetSurfaces, onResetApplications, products, handleChangeSort, handleOnSlide }) => {
    const [openFilter, setOpenFilter] = useState(null);

    const handleOpenFilter = (id) => {
        if(id === openFilter){
            setOpenFilter(null)
        }
        else {
            setOpenFilter(id)
        }
    }

    return (
        <Wrapper>
            <Filter 
                onOpenFilter={() => handleOpenFilter(0)} 
                id={0} 
                onChange={(index) => onChangeSurface(index)} 
                onReset={() => onResetSurfaces()}
                isOpen={0 === openFilter} 
                cbContent={Object.keys(filter)[0] !== undefined && filter[Object.keys(filter)[0]]}
                content={products && products[Object.keys(filter)[0]]}
                title={"Untergrund"}
            />
            <Filter 
                onOpenFilter={() => handleOpenFilter(1)} 
                id={1} 
                onChange={(index) => onChangeApplication(index)} 
                onReset={() => onResetApplications()}
                isOpen={1 === openFilter}
                cbContent={Object.keys(filter)[1] !== undefined && filter[Object.keys(filter)[1]]} 
                content={products && products[Object.keys(filter)[1]]}
                title={"Verwendung"}
            />
            <Select handleChangeSort={(e) => handleChangeSort(e)}/>
        	<RangeSlider handleOnSlide={(values) => handleOnSlide(values)}/>
        </Wrapper>
    )
}

const mapStateToProps = ({ filter, products }) => {
    return {
        filter,
        products
    }
}
  
const mapDispatchToProps = dispatch => ({
    onChangeSurface : index => dispatch(changeSurface(index)),
    onChangeApplication : index => dispatch(changeApplication(index)),
    onResetSurfaces : () => dispatch(resetSurfaces()),
    onResetApplications : () => dispatch(resetApplications())
})

export default connect(mapStateToProps, mapDispatchToProps)(Filters)