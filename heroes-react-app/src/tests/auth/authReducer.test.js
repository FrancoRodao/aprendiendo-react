import { authReducer } from "../../auth/authReducer"
import { types } from "../../types/types"

describe('authReducer tests', () => {

    const user = {
        name: "Franco",
        logged: false
    }

    test('should return default state', () => {
        const state = authReducer(user, {})
        expect(state).toEqual(user)
    })
    

    test('should authenticate and put the name of the user', () => {
        const state = authReducer(user, {
            type: types.login,
            payload: user
        })

        expect(state).toEqual({
            ...user,
            logged: true
        })
    })
    
    test('should delete name of user and logout', () => {
        const state = authReducer(user, {
            type: types.logout,
            payload: user
        })

        expect(state).toEqual({
            ...user,
            logged: false
        })
    })
    

})
