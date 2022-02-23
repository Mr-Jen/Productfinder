import { CHANGE_END } from '../actions/end';

const end = (state = false, action) => {
    const { type, payload } = action;
    switch (type){
        case CHANGE_END:
            return payload.endState
        default:
            return state;
    }
}

export default end;