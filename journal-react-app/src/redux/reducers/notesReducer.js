import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.notesAdd: 
            return {
                ...state,
                notes: [...state.notes, {
                    id: action.payload.id, 
                    ...action.payload.note
                }]
            }

        case types.notesSetActive:

            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]
            }

        case types.notesUpdate:

            return {
                ...state,
                notes: state.notes.map(
                    note => (note.id === action.payload.note.id)
                        ?
                        action.payload.note : note
                )
            }

        case types.notesDelete:
            return {
                ...state,
                notes: state.notes.filter(note => note.id === action.payload.note.id ? null:note),
                active: null
            }
        
        default:
            return state
    }
}