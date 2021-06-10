import React from 'react'
import { useSelector } from 'react-redux'
import NothingSelected from '../components/NothingSelected'
import SideBar from '../components/SideBar'
import NoteScreen from './NoteScreen'

export default function JournalScreen() {

    const state = useSelector(state => state)
    const loading = state.ui.loading
    const activeNote = state.notes.active

    if(loading){
        console.log("patnalla de carga")
    }

    return (
        <div className="journal__main-content">
            <SideBar/>

            <main>
                {
                    activeNote ? 
                        <NoteScreen /> 
                        : 
                        <NothingSelected />
                }
            </main>
        </div>
    )
}
