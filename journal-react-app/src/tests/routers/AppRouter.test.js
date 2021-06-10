import React from 'react'
import { mount } from "enzyme"
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router';
import AppRouter from '../../routers/AppRouter';
import { act } from '@testing-library/react';
import firebase from 'firebase';

import { loginAction } from '../../redux/actions/authActions';
jest.mock('../../redux/actions/authActions', () => {
    return {
        __esModule: true,
        loginAction: jest.fn()
    }
})

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const storeInitialState = {
    auth: {},
    notes: { notes: [] },
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

describe('AppRouter tests', () => {

    test('should login user if it is authenticated', async () => {
        await act(async () => {
            await firebase.auth().signInWithEmailAndPassword("test@testing.com", "testing")
            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            )
        })

        expect(loginAction).toHaveBeenCalledWith(process.env.REACT_APP_testUuidUser, null)

    })


})
