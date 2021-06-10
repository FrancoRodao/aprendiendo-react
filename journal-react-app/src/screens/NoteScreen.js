import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import NotesAppBar from '../components/notes/NotesAppBar'
import useForm from '../hooks/useForm'
import { activeNoteAction, startDeleteNote } from '../redux/actions/notesActions'

export default function NoteScreen() {

    const dispatch = useDispatch()

    const { active: activeNote } = useSelector(state => state.notes)
    const activeNoteId = useRef(activeNote.id)

    const {formValues, handleInputChange, resetForm} = useForm(activeNote)

    const handleDelete = () => {
        dispatch(startDeleteNote(activeNote))
    }
    
    //reset form when change active note
    useEffect(() => {
        if(activeNoteId.current !== activeNote.id){
            resetForm()
            activeNoteId.current = activeNote.id
        }
    }, [activeNote, resetForm])

    //update values
    useEffect(() => {
        dispatch(activeNoteAction(formValues.id, {...formValues}))
    }, [formValues, dispatch])

    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    onChange={handleInputChange}
                    value={formValues.title}
                />

                <textarea
                    name="body"
                    onChange={handleInputChange}
                    value={formValues.body}
                    placeholder="What happend today"
                    className="notes__textarea"
                    autoComplete="off"
                />

                {
                    activeNote.imgUrl &&
                    <div className="notes__image">
                        <img
                            src={activeNote.imgUrl}
                            alt="note"
                        />
                    </div>
                }

            </div>

            <button onClick={handleDelete} className="btn btn-danger">
                Delete
            </button>

        </div>
    )
}
