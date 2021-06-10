import React from 'react'
import { AuthContext } from '../auth/authContext'
import { types } from '../types/types'
import { useContext } from 'react'

export default function LoginScreen( {history} ) {

    const { dispatch } = useContext(AuthContext)

    const handleLogin = ()=>{

        const lastPath = localStorage.getItem("lastPath") ||'/'

        dispatch({
            type: types.login,
            payload: {
                name: "Franco"
            }
        })
        history.push(lastPath)
    }

    return (
        <div className="container mt-5">
            <h2>login screen</h2>
            <hr/>

            <button
                className="btn btn-primary"
                onClick={handleLogin}
            >
                login
            </button>
        </div>
    )
}
