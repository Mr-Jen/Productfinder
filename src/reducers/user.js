import { ADD_TARGET } from '../actions/user'

const user = (state = {"pre": [], "target": null}, action) => {
    const { type, payload } = action;
    switch (type){
        case ADD_TARGET:
            return {...state, "target": payload.target}
        default:
            return state;
    }
}

export default user;