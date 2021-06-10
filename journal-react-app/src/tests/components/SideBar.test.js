import { mount } from "enzyme"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router"
import createMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import SideBar from "../../components/SideBar"

import { startAddNewNote } from "../../redux/actions/notesActions"
jest.mock('../../redux/actions/notesActions', () => ({
    startAddNewNote: jest.fn()
}))

import { startLogout } from "../../redux/actions/authActions"
jest.mock('../../redux/actions/authActions', () => ({
    startLogout: jest.fn()
}))

const storeInitialState = {
    auth: {
        name: 'TestingName'
    },
    notes: {notes: []}
}

const middlewares = [thunk]
const mockStore = createMockStore(middlewares)
const store = mockStore(storeInitialState)
store.dispatch = jest.fn()

describe('SideBar tests', () => {
    
    const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter >
                <SideBar></SideBar>
            </MemoryRouter>
        </Provider>)

    test('should match to snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    
    test('should add entry', () => {
        wrapper.find('.journal_new-entry').simulate("click")
        expect(startAddNewNote).toBeCalledTimes(1)
    })
    
    test('should logout user', () => {
        wrapper.find('.btn').simulate("click")
        expect(startLogout).toBeCalledTimes(1)
    })
    

})
