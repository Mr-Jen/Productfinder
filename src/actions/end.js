export const CHANGE_END = 'CHANGE_END'

export const changeEnd = (endState) => ({
    type: CHANGE_END,
    payload: {
        endState
    }
})