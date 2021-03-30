import { ADD_TO_HISTORY } from '../actions/shared';

const history = (state = [], action) => {
    const { type, payload } = action;
    switch (type){
        case ADD_TO_HISTORY: 
            //console.log('HISTORY_STACK', payload.itemId)
            return [...state, payload.itemId]
        default:
            return state;
    }
}

export default history;