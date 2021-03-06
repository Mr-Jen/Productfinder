export const SET_TARGET = 'SET_TARGET'
export const SET_COATING = 'SET_COATING'
export const SET_COATING_LENGTH = 'SET_COATING_LENGTH'
export const SET_ROUGHNESS = 'SET_ROUGHNESS'
export const SET_WOOD_TYPE = 'SET_WOOD_TYPE'

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

export const setCoatingLength = (length) => ({
    type: SET_COATING_LENGTH,
    payload: {
        length
    }
})

export const setRoughness = (roughness) => ({
    type: SET_ROUGHNESS,
    payload: {
        roughness
    }
})

export const setWoodType = (woodtype) => ({
    type: SET_WOOD_TYPE,
    payload: {
        woodtype
    }
})