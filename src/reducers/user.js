import { SET_TARGET, SET_COATING } from '../actions/user'

const user = (state = {"coating": [], "target": null}, action) => {
    const { type, payload } = action;
    switch (type){
        case SET_TARGET:
            return {...state, "target": payload.target}
        case SET_COATING:
            
        default:
            return state;
    }
}

export default user;