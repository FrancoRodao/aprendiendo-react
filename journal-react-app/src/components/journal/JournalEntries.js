import React from 'react'
import { useSelector } from 'react-redux'
import JournalEntry from './JournalEntry'

export default function JournalEntries() {

    const notes = useSelector(state => state.notes.notes)
    return (
        <div className="journal__entries">
            {
                notes.map(note => (
                    <JournalEntry entry={note} key={note.id} />
                ))
            }
        </div>
    )
}
