import { authReducer } from "../../../redux/reducers/authReducer"
import { types } from "../../../redux/types/types"

describe('authReducer tests', () => {

    const initState = {
        uid: 'randomuid',
        displayname: 'randomname'
    }
    
    const payload = {
        uid: 'abcdefg',
        displayname: 'Franco'
    }

    test('should use the reducer and login the user', () => {

        const state = authReducer({}, {
            type: types.authLogin,
            payload
        })

        expect(state).toStrictEqual({
            uid: payload.uid,
            name: payload.displayname
        })

    })
    
    test('should register a user', () => {

        const state = authReducer({}, {
            type: types.authRegister,
            payload
        })

        expect(state).toStrictEqual({
            uid: payload.uid,
            name: payload.displayname
        })
    })


    test('should logout a user', () => {

        const state = authReducer(initState, {
            type: types.authLogout,
            payload
        })
    
        expect(state).toStrictEqual({})
    })
    

    test('invalid reducer action should return the initialstate', () => {
        
        const state = authReducer(initState, {
            type: 'invalid action',
            payload
        })

        expect(state).toStrictEqual(initState)

    })
    

})
