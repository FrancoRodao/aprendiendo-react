import { types } from "../types/types";

const initialState = {}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                uid: action.payload.uid,
                name: action.payload.displayname
            };

        case types.authRegister:

            return {
                uid: action.payload.uid,
                name: action.payload.displayname
            };

        case types.authLogout:

            return {}

        default:
            return state;
    }
}