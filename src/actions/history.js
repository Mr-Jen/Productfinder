export const ADD_TO_HISTORY = 'ADD_TO_HISTORY'
export const REMOVE_FROM_HISTORY = 'REMOVE_FROM_HISTORY'

export const addToHistory = (itemId) => ({
    type: ADD_TO_HISTORY,
    payload: {
        itemId
    }
})

export const removeFromHistory = (itemId) => ({
    type: REMOVE_FROM_HISTORY,
    payload: {
        itemId
    }
})