import { mount } from "enzyme"

import { Provider } from "react-redux"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"

import JournalEntry from "../../../components/journal/JournalEntry"

import { activeNoteAction } from "../../../redux/actions/notesActions"
jest.mock('../../../redux/actions/notesActions', () => ({
    activeNoteAction: jest.fn()
}))

const storeInitialState = {}

const middlewares = [thunk]
const mockStore = createMockStore(middlewares)
const store = mockStore(storeInitialState)
store.dispatch = jest.fn()

describe('JournalEntry tests', () => {

    const entryNote = {
        id: 7357,
        title: 'hi',
        body: 'world',
        imgUrl: 'https://someurl.com'
    }

    const wrapper = mount(
        <Provider store={store}>
            <JournalEntry entry={entryNote} />
        </Provider>
    )

    test('should match to snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    })
    

    test('should active entry', () => {
        wrapper.find('.journal__entry').simulate('click')
        expect(activeNoteAction).toBeCalledWith(entryNote.id, entryNote)
    })

    
})
