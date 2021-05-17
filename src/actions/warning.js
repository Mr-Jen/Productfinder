export const ADD_TO_WARNINGS = 'ADD_TO_WARNINGS'
export const REMOVE_FROM_WARNINGS = 'REMOVE_FROM_WARNINGS'

export const addToWarnings = (itemId) => ({
    type: ADD_TO_WARNINGS,
    payload: {
        itemId
    }
})

export const removeFromWarnings = (itemId) => ({
    type: REMOVE_FROM_WARNINGS,
    payload: {
        itemId
    }
})