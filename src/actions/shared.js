export const LOAD_CONFIG = 'LOAD_CONFIG'
export const LOAD_PRODUCTS = 'LOAD_PRODUCTS'

export const loadConfig = (config) => {
    return {
        type: LOAD_CONFIG,
        payload: {
            ...config,
        },
    };
}

export const handleLoadConfig = () => {
    return dispatch => {
        //dispatch(setIsLoading(true))
        fetch('api/config.json')
            .then(res => res.json())
            .then(config => {
                dispatch(loadConfig({...config}))
                //dispatch(setIsLoading(false))
            })
    }
}

export const loadProducts = (products) => {
    return {
        type: LOAD_PRODUCTS,
        payload: {
            ...products
        }
    }
}

export const handleLoadProducts = () => {
    return dispatch => {
        fetch('/api/data.json', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(products => {
                dispatch(loadProducts({...products}))
            })
    }
}
