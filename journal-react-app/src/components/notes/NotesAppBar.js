import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { startSaveNote, startUploadPicture } from '../../redux/actions/notesActions'

export default function NotesAppBar() {

    const dispatch = useDispatch()
    const {active: activeNote} = useSelector(state => state.notes)

    const handleSaveNote = (e) => {
        e.preventDefault()
        dispatch(startSaveNote(activeNote))
    }

    const handlePictureClick = (e) => {
        document.querySelector("#fileSelector").click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if(file){
            dispatch(startUploadPicture(file))
        }
    }

    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>
            <input 
                id="fileSelector"
                type="file"
                name="file"
                onChange={handleFileChange}
                style={{
                    display: 'none'
                }}
            />

            <div>
                <button onClick={handlePictureClick} className="btn">Picture</button>
                <button onClick={handleSaveNote} className="btn">Save</button>
            </div>
        </div>
    )
}
