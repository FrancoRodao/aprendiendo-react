import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { activeNoteAction } from '../../redux/actions/notesActions'

export default function JournalEntry({ entry }) {

    const entryDate = moment(entry.date)
    const dispatch = useDispatch()

    const handleActiveEntry = () => {
        dispatch(activeNoteAction(entry.id, entry))
    }

    return (
        <div onClick={handleActiveEntry} className="journal__entry">
            {
                entry.imgUrl &&
                <div
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(${entry.imgUrl})`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {entry.title}
                </p>
                <p className="journal__entry-content">
                    {entry.body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{entryDate.format("dddd")}</span>
                <h4>{entryDate.format("Do")}</h4>
            </div>

        </div>
    )
}
