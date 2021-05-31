import { SET_TARGET, SET_COATING, SET_COATING_LENGTH } from '../actions/user'

const user = (state = {"coating": [], "target": null}, action) => {
    const { type, payload } = action;
    switch (type){
        case SET_TARGET:
            return {...state, "target": payload.target}
        case SET_COATING:
            return {...state, "coating": [...state["coating"] , payload.coating]}
        case SET_COATING_LENGTH:
            let new_coatings = state["coating"]
            new_coatings.length = payload.length
            return {...state, "coating": new_coatings}
        default:
            return state;
    }
}

export default user;