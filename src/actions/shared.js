export const LOAD_CONFIG = 'LOAD_CONFIG'
export const ADD_TO_HISTORY= 'ADD_TO_HISTORY'

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

export const addToHistory = (itemId) => ({
    type: ADD_TO_HISTORY,
    payload: {
        itemId
    }
})