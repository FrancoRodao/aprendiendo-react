/**
 * @jest-environment node
 */

/*
 ^
 | firebase problems
 |
 */

import configureStore from 'redux-mock-store' //ES6 modules
import thunk from "redux-thunk";
import { db } from '../../../firebase/firebase.config';
import { startAddNewNote, startLoadingNotes, startSaveNote, startUploadPicture } from '../../../redux/actions/notesActions';
import { types } from '../../../redux/types/types';
import { readFileSync } from "fs";
import { imageUploadToCloudinary } from "../../../helpers/imageUpload";

jest.mock('../../../helpers/imageUpload', () => ({
    __esModule: true,
    imageUploadToCloudinary: () => 'https://someurl.com/uploadedphoto.jpg'
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const storeInitialState = {
    auth: {
        uid: 'TESTING'
    },
    notes: {
        active: {
            id: '0WMAcmAUPTY4u8GHeMl2',
            title: 'ssda',
            body: 'aaa',
            date: 7357
        }
    }
}
let store = mockStore(storeInitialState)

describe('notesActions tests', () => {

    beforeEach(() => store = mockStore(storeInitialState))

    test('should start create an new note', async () => {
        await store.dispatch(startAddNewNote())

        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: types.notesAdd,
            payload: {
                id: expect.any(String),
                note: {
                    title: expect.any(String),
                    body: expect.any(String),
                    date: expect.any(Number)
                }
            }
        })
        expect(actions[1]).toEqual({
            type: types.notesSetActive,
            payload: {
                id: expect.any(String),
                title: expect.any(String),
                body: expect.any(String),
                date: expect.any(Number)
            }
        })
        //delete doc
        const docId = actions[1].payload.id
        await db.doc(`TESTING/journal/notes/${docId}`).delete()
    })

    test('should load notes', () => {
        const userUid = store.getState().auth.uid
        return store.dispatch(startLoadingNotes(userUid))
            .then(() => {
                const actions = store.getActions()
                expect(actions[0]).toEqual({
                    type: types.notesLoad,
                    payload: expect.any(Array)
                })
            })
    })

    test('should save note', async () => {

        const note = {
            id: '0WMAcmAUPTY4u8GHeMl2', // real id
            title: 'note title',
            body: 'body title',
            date: 323232
        }

        await store.dispatch(startSaveNote(note))

        const actions = store.getActions()
        expect(actions[0]).toEqual({
            type: types.notesUpdate,
            payload: {
                note: expect.any(Object)
            }
        })

    })

    test('should upload image', async () => {
        const file = readFileSync(__dirname + '/photoTest.jpg')
        await store.dispatch(startUploadPicture(file))

        const docRef = await db.doc('/TESTING/journal/notes/0WMAcmAUPTY4u8GHeMl2');
        const docData = await (await docRef.get()).data()
        expect( docData.imgUrl ).toBe('https://someurl.com/uploadedphoto.jpg');
        
        //delete imgurl so as not to sabotage future tests
        await docRef.update({
            ...storeInitialState.notes.active,
            imgUrl: null
        })
    })
})
