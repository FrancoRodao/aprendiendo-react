import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { startLogout } from '../redux/actions/authActions'
import { startAddNewNote } from '../redux/actions/notesActions'
import JournalEntries from './journal/JournalEntries'

export default function SideBar() {

    const dispatch = useDispatch()
    const history = useHistory()
    const userName = useSelector(state => state.auth.name)

    const handleAddEntry = () => {
        dispatch(startAddNewNote())
    }

    const handleLogout = () => {
        dispatch( startLogout() )
        history.push("/login")
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    <span>{userName}</span>
                </h3>

                <button onClick={handleLogout} className="btn">Logout</button>
            </div>

            <div onClick={handleAddEntry} className="journal_new-entry">
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />
        </aside>
    )
}
