import { mount } from "enzyme"
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import RegisterScreen from "../../screens/RegisterScreen";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { startRegisterUser } from "../../redux/actions/authActions";
import { clearErrorsAction } from "../../redux/actions/uiActions";

jest.mock('../../redux/actions/authActions', () => ({
    __esModule: true,
    startRegisterUser: jest.fn(),
}))

jest.mock('../../redux/actions/uiActions', () => ({
    __esModule: true,
    clearErrorsAction: jest.fn()
}))

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
store.dispatch = () => Promise.resolve({
    ui:{
        errors: {
            state: false
        }
    }
})

describe('Register screen tests', () => {

    beforeEach(() => store = mockStore(storeInitialState))

    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter>
                <RegisterScreen history={{
                    push: jest.fn()
                }} />
            </MemoryRouter>
        </Provider>
    )

    test('should match to snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should dispatch start register user', () => {

        wrapper.find('.btn.btn-primary.btn-block').simulate("submit", {
            preventDefault: () => { },
            target: [
                {
                    value: 'new-user'
                },
                {
                    value: 'new-user@gmail.com'
                },
                {
                    value: 'new-user-password'
                },
                {
                    value: 'new-user-password'
                }
            ]
        })

        expect(startRegisterUser)
            .toHaveBeenCalledWith(
                'new-user', 'new-user@gmail.com', 'new-user-password'
            )
    })

    test('should show error', () => {
        const storeInitialState = {
            auth: {},
            notes: {},
            ui: {
                loading: false,
                errors: {
                    state: true,
                    msgErr: 'EMAIL ALREADY REGISTER OR SOME STUPID ERROR XD'
                }
            }
        }
        const store = mockStore(storeInitialState)

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        )

        const errorText = wrapper.find('.auth__alert-error-ui').text()
        expect(errorText).toBe(storeInitialState.ui.errors.msgErr)
    })
    

    test('should clear errors when change page', () => {
        wrapper.find("Link").simulate("click")
        expect(clearErrorsAction).toBeCalledTimes(1)
    })
    

})
