import React, { useEffect, useState } from 'react'
import firebase from "firebase";
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom'

import JournalScreen from '../screens/JournalScreen'
import AuthRoutes from './AuthRoutes'
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/actions/authActions';
import PrivateRoute from './PrivateRoute';
import { startLoadingNotes } from '../redux/actions/notesActions';

export default function AppRouter() {

    const dispatch = useDispatch()

    //check firebase state loading/loaded
    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(loginAction(user.uid, user.displayName))
                setisLoggedIn(true)

                dispatch(startLoadingNotes(user.uid))

            }else{
                setisLoggedIn(false)
            }
            setChecking(false)
        })

    }, [dispatch, setChecking, setisLoggedIn])

    return (
        checking ? <h1>Wait please...</h1> :
            <Router>

                <Switch>

                    <PrivateRoute 
                        isAuthenticated={isLoggedIn}
                        exact={true}
                        path="/"
                        component={JournalScreen}
                    />

                    <AuthRoutes isAuthenticated={isLoggedIn} />

                    <Redirect to="/" />

                </Switch>

            </Router>
    )
}
