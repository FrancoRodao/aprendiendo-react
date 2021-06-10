import React from 'react'
import { mount } from "enzyme"
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import LoginScreen from "../../screens/LoginScreen"
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router';
import { startGoogleLogin, startLogin } from '../../redux/actions/authActions';

jest.mock('../../redux/actions/authActions', () => {
    return {
        __esModule: true,
        startGoogleLogin: jest.fn(),
        startLogin: jest.fn()
    }
})

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const storeInitialState = {
    auth: {},
    notes: {},
    ui: {
        loading: false,
        errors: {
            state: false,
            msgErr: ''
        }
    }
}
let store = mockStore(storeInitialState)
store.dispatch = jest.fn()

describe('login screen tests', () => {

    beforeEach(() => store = mockStore(storeInitialState))

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <LoginScreen />
            </MemoryRouter>
        </Provider>
    )

    test('should match to snapshot', () => {

        expect(wrapper).toMatchSnapshot()
    })

    test('should dispatch google login action', () => {
        wrapper.find('.google-btn').prop('onClick')()
        expect(startGoogleLogin).toHaveBeenCalled()
    })

    test('should dispatch normal login', () => {
        wrapper.find('.btn.btn-primary.btn-block').simulate("submit", {
            preventDefault: () => {},
            target: [
                {
                    value: process.env.REACT_APP_testEmailUser
                },
                {
                    value: process.env.REACT_APP_testPasswordUser
                }
            ]
        })

        expect(startLogin).toHaveBeenCalledWith(process.env.REACT_APP_testEmailUser, process.env.REACT_APP_testPasswordUser)
    })



})
