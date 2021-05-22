export const SET_TARGET = 'SET_TARGET'
export const SET_COATING = 'SET_COATING'

export const setTarget = (target) => ({
    type: SET_TARGET,
    payload: {
        target
    }
})

export const setCoating = (coating) => ({
    type: SET_COATING,
    payload: {
        coating
    }
})