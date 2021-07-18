export const INIT_FILTERS = 'INIT_FILTERS'
export const CHANGE_SURFACE = 'CHANGE_SURFACE'
export const CHANGE_APPLICATION = 'CHANGE_APPLICATION'
export const RESET_SURFACES = 'RESET_SURFACES'
export const RESET_APPLICATIONS = 'RESET_APPLICATIONS'

export const loadFilters = (initConfig) => ({
    type: INIT_FILTERS,
    payload: {
        initConfig
    }
})

export const changeSurface = (index) => ({
    type: CHANGE_SURFACE,
    payload: {
        index
    }
})

export const changeApplication = (index) => ({
    type: CHANGE_APPLICATION,
    payload: {
        index
    }
})

export const resetSurfaces = () => ({
    type: RESET_SURFACES
})

export const resetApplications = () => ({
    type: RESET_APPLICATIONS
})