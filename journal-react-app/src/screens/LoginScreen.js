import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from "validator";
import { startGoogleLogin, startLogin } from '../redux/actions/authActions'
import { errorAction } from '../redux/actions/uiActions';

export default function LoginScreen() {

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const loading = state.ui.loading
    const { state: errorState, lastMsg } = state.ui.errors

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = {
            email: e.target[0].value,
            password: e.target[1].value
        }

        if (isFormValid(form)) {
            dispatch(startLogin(form.email, form.password))
        }
    }

    const isFormValid = ({ email, password }) => {
        let formErrors = {
            email: '',
            password: ''
        }

        if (!validator.isEmail(email)) {
            formErrors.email = "Email is not valid"
        }

        if (password.length === 0) {
            formErrors.password = "Password is required"
        }

        setFormErrors(formErrors)

        if (formErrors.email.length > 0 || formErrors.password.length > 0) {
            return false
        } else {
            return true
        }
    }

    const handleGoogleLogin = () => dispatch(startGoogleLogin())

    //clear errors when change page
    const handleLinkClick = () => dispatch(errorAction(false, ""))

    return (
        <>
            <h3 className={`auth__title ${errorState ? 'auth__title-errorUI':''}`}>
                Login
            </h3>

            {
                errorState && 
                <div className="auth__alert-error-ui">
                    {lastMsg}
                </div>
            }

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    autoComplete="on"
                    className={
                        `auth__input ${formErrors.email.length > 0 ?
                            'auth__input-error' : ''}`
                    }
                />

                {
                    formErrors.email.length > 0 &&
                    <p className="auth__alert-error">
                        {formErrors.email}
                    </p>
                }

                <input
                    type="password"
                    placeholder="Password"
                    className={
                        `auth__input ${formErrors.password.length > 0 ?
                            'auth__input-error' : ''}`
                    }
                />

                {
                    formErrors.password.length > 0 &&
                    <p className="auth__alert-error">
                        {formErrors.password}
                    </p>
                }

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    {
                        loading ?
                            <i className="fas fa-spinner fa-spin"></i>
                            :
                            "Login"
                    }
                </button>

                <hr></hr>
                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>


                <Link onClick={handleLinkClick} className="link" to="/register" >
                    Create new account
                </Link>

            </form>
        </>
    )
}
