import { mount } from "enzyme"

import { Provider } from "react-redux"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"

import NoteScreen from "../../screens/NoteScreen"

import { activeNoteAction } from "../../redux/actions/notesActions"
jest.mock('../../redux/actions/notesActions', () => ({
    activeNoteAction: jest.fn()
}))

const storeInitialState = {
    auth: {},
    notes: {
        active: {
            id: 7357,
            title: 'hi',
            body: 'world',
            imgUrl: 'https://someurl.com'
        }
    },
    ui: {}
}

const middlewares = [thunk]
const mockStore = createMockStore(middlewares)
const store = mockStore(storeInitialState)
store.dispatch = jest.fn()

describe('NoteScreen tests', () => {
    const wrapper = mount(
        <Provider store={store}>
            <NoteScreen />
        </Provider>)
    test('should to match snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('should update active note', async () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'new value',
            }
        })

        expect(activeNoteAction).toBeCalledWith(7357, {
            id: 7357,
            title: 'new value',
            body: 'world',
            imgUrl: 'https://someurl.com'
        })

    })
})
