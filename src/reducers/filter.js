import { INIT_FILTERS, CHANGE_SURFACE, CHANGE_APPLICATION, RESET_APPLICATIONS, RESET_SURFACES,  } from '../actions/filter';

const filters = (state = {}, action) => {
    const { type, payload } = action;
    switch (type){
        case INIT_FILTERS:
            return {
                ...state,
                ...payload.initConfig
            }
        case CHANGE_SURFACE:
            let new_surfaces = [...state["surfaces"]]
            new_surfaces[payload.index] = !new_surfaces[payload.index]
            return {
                ...state,
                "surfaces": [...new_surfaces]
            }
        case CHANGE_APPLICATION:
            let new_applications = [...state.applications]
            new_applications[payload.index] = !new_applications[payload.index]
            return {
                ...state,
                "applications": [...new_applications]
            }
        case RESET_SURFACES:
            let reset_surfaces = state["surfaces"].map(elem => false)
            return {
                ...state,
                "surfaces": [...reset_surfaces]
            }
        case RESET_APPLICATIONS:
            let reset_applications = state["applications"].map(elem => false)
            return {
                ...state,
                "applications": [...reset_applications]
            }
        default:
            return state;
    }
}

export default filters;