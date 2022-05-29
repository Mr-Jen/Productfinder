import { LOAD_PRODUCTS } from '../actions/shared';

const products = (state = null, action) => {
    const { type, payload } = action;
    switch (type){
        case LOAD_PRODUCTS:
            //console.log("LOADING PRODUCTS IN REDUCERS")
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}

export default products;