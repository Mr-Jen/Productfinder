export const LOAD_CONFIG = 'LOAD_CONFIG'

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
