import { LOAD_CONFIG } from '../actions/shared';

const decisions = (state = null, action) => {
    const { type, payload } = action;
    switch (type){
        case LOAD_CONFIG:
            return {
                ...state,
                ...payload.decisions
            }
        default:
            return state;
    }
}

export default decisions;