import { SET_TARGET, SET_COATING, SET_COATING_LENGTH, SET_ROUGHNESS, SET_WOOD_TYPE } from '../actions/user'

const user = (state = {"coating": [], "target": null, "roughness": null, "woodtype": null}, action) => {
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
        case SET_ROUGHNESS:
            return {...state, "roughness": payload.roughness}
        case SET_WOOD_TYPE:
            return {...state, "woodtype": payload.woodtype}
        default:
            return state;
    }
}

export default user;