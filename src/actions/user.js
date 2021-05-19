export const ADD_TARGET = 'ADD_TARGET'
export const ADD_PRE = 'ADD_PRE'

export const addTarget= (target) => ({
    type: ADD_TARGET,
    payload: {
        target
    }
})