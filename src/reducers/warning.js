import { ADD_TO_WARNINGS, REMOVE_FROM_WARNINGS } from '../actions/warning';

const warning = (state = [], action) => {
    const { type, payload } = action;
    switch (type){
        case ADD_TO_WARNINGS: 
            return [...state, payload.itemId]
        case REMOVE_FROM_WARNINGS:
            const updatedWarnings = [...state]
            const index = updatedWarnings.indexOf(payload.itemId)
            if (index > -1){
                updatedWarnings.splice(index, 1)
            }
            return updatedWarnings
        default:
            return state;
    }
}

export default warning;