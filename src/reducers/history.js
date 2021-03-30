import { ADD_TO_HISTORY, REMOVE_FROM_HISTORY } from '../actions/history';

const history = (state = [], action) => {
    const { type, payload } = action;
    switch (type){
        case ADD_TO_HISTORY: 
            return [...state, payload.itemId]
        case REMOVE_FROM_HISTORY:
            const updatedHistory = [...state]
            updatedHistory.length = payload.itemId
            return updatedHistory
        default:
            return state;
    }
}

export default history;