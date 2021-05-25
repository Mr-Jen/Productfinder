import { SET_TARGET, SET_COATING } from '../actions/user'

const user = (state = {"coating": [], "target": null}, action) => {
    const { type, payload } = action;
    switch (type){
        case SET_TARGET:
            return {...state, "target": payload.target}
        case SET_COATING:
            console.log("INSIDE COATING SETTING VALUE: ", payload.coating)
            return {...state, "coating": [payload.coating]}
        default:
            return state;
    }
}

export default user;