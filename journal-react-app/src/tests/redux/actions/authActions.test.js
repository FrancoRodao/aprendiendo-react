import { loginAction, logoutUserAction, startLogout, startGoogleLogin, startLogin, startRegisterUser } from "../../../redux/actions/authActions"
import configureStore from 'redux-mock-store' //ES6 modules
import thunk from "redux-thunk";
import { types } from "../../../redux/types/types";

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const storeInitialState = {
    auth: {},
    notes: {},
    ui: {
        state: false,
        lastMsg: ''
    }
}
let store = mockStore(storeInitialState)


describe('authActions tests', () => {
    
    beforeEach(() => store = mockStore(storeInitialState))

    test('should create a login and logout action', async () => {
        await store.dispatch(loginAction('TESTING', 'TESTING'))
        let actions = store.getActions()
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: 'TESTING',
                displayname: 'TESTING'
            }
        })

        await store.dispatch(logoutUserAction())
        actions = store.getActions()
        expect(actions[1]).toEqual({
            type: types.authLogout,
            payload: {}
        })
    })
    
    test('should start logout user', async () => {
        await store.dispatch(startLogout())

        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: types.uiStartLoading,
            payload: {loading: true}
        })
        expect(actions[1]).toEqual({
            type: types.authLogout,
            payload: {}
        })
        expect(actions[2]).toEqual({
            type: types.uiFinishLoading,
            payload: {loading: false}
        })

    })
    
    test('should start login with email and password', async () => {
        await store.dispatch(startLogin(process.env.REACT_APP_testEmailUser, process.env.REACT_APP_testPasswordUser))

        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: types.uiStartLoading,
            payload: {loading: true}
        })
        expect(actions[1]).toEqual({
            type: types.authLogin,
            payload: {
                uid: process.env.REACT_APP_testUuidUser,
                displayname: null
            }
        })
        expect(actions[2]).toEqual({
            type: types.uiError,
            payload: {state: false, lastMsg: ''}
        })
        expect(actions[3]).toEqual({
            type: types.uiFinishLoading,
            payload: {loading: false}
        })
    })
    
})
