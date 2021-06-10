import { db } from "../../firebase/firebase.config"
import { imageUploadToCloudinary } from "../../helpers/imageUpload"
import { loadNotes } from "../../helpers/loadNotes"
import { types } from "../types/types"

export const startAddNewNote = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.uid

        const newNote = {
            title: 'title',
            body: 'body',
            date: new Date().getTime()
        }

        const noteRef = await db.collection(`${userId}/journal/notes`).add(newNote)
        dispatch(addNewNote(noteRef.id, newNote))
        dispatch(activeNoteAction(noteRef.id, newNote))
    }
}

export const addNewNote = (noteId, note) => ({
    type: types.notesAdd,
    payload: {
        id: noteId,
        note
    }
})

export const activeNoteAction = (id, note) => ({
    type: types.notesSetActive,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (userId) => {
    return async (dispatch) => {
        const notes = await loadNotes(userId)
        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})


export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth
        const noteToFireStore = {...note}
        delete noteToFireStore.id

        await db.collection(`${uid}/journal/notes`).doc(`${note.id}`).update(noteToFireStore)
        dispatch(refreshNote(note))
    }
}

export const refreshNote = (note) => ({
    type: types.notesUpdate,
    payload: {
        note
    }
})

export const startUploadPicture = (file) => {
    return async (dispatch, getState) => {
        const activeNote = getState().notes.active
        const imageUrl = await imageUploadToCloudinary(file)
        activeNote.imgUrl = imageUrl
        
        dispatch(startSaveNote(activeNote))
    }
}


export const startDeleteNote = (note) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.uid

        await db.doc(`${userId}/journal/notes/${note.id}`).delete()
        dispatch(deleteNote(note))
    }
}

export const deleteNote = (note) => ({
    type: types.notesDelete,
    payload: {
        note
    }
})