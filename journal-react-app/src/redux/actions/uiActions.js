import { types } from "../types/types"

export const startLoadingAction = () => (
    {
        type: types.uiStartLoading,
        payload: {
            loading: true
        }
    }
)


export const finishLoadingAction = () => (
    {
        type: types.uiFinishLoading,
        payload: {
            loading: false
        }
    }
)

export const errorAction = (state, message) => (
    {
        type: types.uiError,
        payload: {
            state,
            lastMsg: message
        }
    }
)

export const clearErrorsAction = () =>  (
    {
        type: types.uiError,
        payload: {
            state: false,
            lastMsg: ""
        }
    }
)