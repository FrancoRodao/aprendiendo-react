import { types } from "../types/types";

const initialState = {
    loading: false,
    errors: {
        state: false,
        lastMsg: ""
    }
}

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiStartLoading:
            return {
                ...state,
                loading: action.payload.loading
            }

        case types.uiFinishLoading:
            return {
                ...state,
                loading: action.payload.loading
            }

        case types.uiError:
            return {
                ...state,
                errors: {
                    //state: true have at least one error
                    state: action.payload.state,
                    // if the message does not arrive, do not change it to undefined
                    lastMsg: (action.payload.lastMsg === '') ? '' : (action.payload.lastMsg || state.errors.lastMsg)
                }
            }

        default:
            return state
    }

}