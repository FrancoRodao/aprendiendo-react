import { db } from "../firebase/firebase.config"

export const loadNotes = async (userId) => {
    const notesSnap = await db.collection(`${userId}/journal/notes`).get()
    const notes = []

    notesSnap.forEach(snapChild => {
        notes.push({
            id: snapChild.id,
            ...snapChild.data()
        })
    })

    return notes
}