import React, {useState} from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { changeSurface, changeApplication, resetSurfaces, resetApplications } from '../../../../actions/filter'
import Filter from './Filter'

const Wrapper = styled.div`
    display: flex;
    @media (max-width: 805px){
        flex-direction: column;
    }
`


const Filters = ({ filter, onChangeApplication, onChangeSurface, onResetSurfaces, onResetApplications, products }) => {
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
