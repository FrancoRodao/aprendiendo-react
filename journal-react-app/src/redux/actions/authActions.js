import { types } from "../types/types"
import { firebase, googleAuthProvider } from "../../firebase/firebase.config";
import { clearErrorsAction, errorAction, finishLoadingAction, startLoadingAction } from "./uiActions";

export const startLogin = (email, password) => {
    return (dispatch) => {
        dispatch(startLoadingAction())

        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(loginAction(user.uid, user.displayName))
                dispatch(clearErrorsAction())
            })
            .catch(e => {
                if (e.code === "auth/user-not-found" || "auth/wrong-password") {
                    dispatch(errorAction(true, "Wrong credentials"))
                    return
                }
                dispatch(errorAction(true, "Unexpected error"))
            })
            .finally(() => dispatch(finishLoadingAction()))
    }
}

export const startGoogleLogin = () => {
    return dispatch => {
        dispatch(startLoadingAction())

        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(loginAction(user.uid, user.displayName))
                dispatch(clearErrorsAction())
            })
            .catch(() => dispatch(errorAction(true, "Unexpected error")))
            .finally(() => dispatch(finishLoadingAction()))
    }
}

export const loginAction = (uid, displayname) => (
    {
        type: types.authLogin,
        payload: {
            uid,
            displayname
        }
    }
)

export const startRegisterUser = (name, email, password) => {
    return (dispatch, state) => {
        dispatch(startLoadingAction())
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({ user }) => {
                await user.updateProfile({
                    displayName: name,
                    photoURL: ''
                })
                dispatch(registerUserAction(user.uid, user.displayName))
                dispatch( clearErrorsAction() )
            })
            .catch(e => {
                if (e.code === "auth/email-already-in-use") {
                    dispatch(errorAction(true, "Email already registered"))
                    return
                }
                dispatch(errorAction(true, "Unexpected error"))
            })
            .then(() => state())
            .finally(() => dispatch(finishLoadingAction()))
        
    }
}

export const registerUserAction = (uid, displayname) => {
    return {
        type: types.register,
        payload: {
            uid,
            displayname
        }
    }
}


export const startLogout = () => {
    return async (dispatch) => {
        dispatch(startLoadingAction())

        firebase.auth().signOut()
            .then(() => dispatch(logoutUserAction()))
            .catch(() => dispatch(errorAction(true, "Unexpected error")))
            .finally(() => dispatch(finishLoadingAction()))
    }
}

export const logoutUserAction = () => ({
    type: types.authLogout,
    payload: {}
})

