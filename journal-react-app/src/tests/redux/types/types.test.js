import { types } from "../../../redux/types/types"

describe('types test', () => {
    test('should have essentials types', () => {
        const essentialsTypes = {
            authLogin: "[Auth] Login",
            authLogout: "[Auth] Logout",
            authRegister: "[Auth] RegisterUser",
        
            uiStartLoading: "[UI] startLoading",
            uiFinishLoading: "[UI] finishLoading",
            uiError: "[UI] Error",
        
            notesAdd: "[Notes] add new note",
            notesDelete: "[Notes] delete note",
            notesSetActive: "[Notes] set active note",
            notesLoad: "[Notes] load notes",
            notesUpdate: "[Notes] update notes",
            notesImageUrl: "[Notes] update image url",
            notesLogoutClear: "[Notes] Logout clear",
        }

        expect(types).toEqual(essentialsTypes)
    })
    
})

