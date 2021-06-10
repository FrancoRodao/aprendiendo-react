import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from "validator";
import { startRegisterUser } from '../redux/actions/authActions';
import { clearErrorsAction } from '../redux/actions/uiActions';

export default function RegisterScreen({ history }) {

    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const loading = state.ui.loading
    const {state: errorState, msgErr: errorUIMessage } = state.ui.errors
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = {
            name: e.target[0].value,
            email: e.target[1].value,
            password: e.target[2].value,
            confirmPassword: e.target[3].value
        }

        const { name, email, password } = form

        if (isFormValid(form)) {
            dispatch( startRegisterUser(name, email, password) ).then( state => {
                if(state.ui.errors.state) return
                history.push("/")
            })
        }

    }

    const isFormValid = ({ name, email, password, confirmPassword }) => {

        let formErrors = {
            name: '',
            email: '',
            password: ''
        }

        if (name.length === 0) {
            formErrors.name = "Name is required"
        }

        if (!validator.isEmail(email)) {
            formErrors.email = "Email is not valid"
        }

        if (password !== confirmPassword || password.length < 5) {
            formErrors.password = "Password's should be at least 6 characters and match each other"
        }

        setFormErrors(formErrors)

        if (formErrors.name.length > 0 || formErrors.email.length > 0 || formErrors.password.length > 0) {
            return false
        } else {
            return true
        }

    }

    //clear errors when change page
    const handleLinkClick = () => dispatch( clearErrorsAction() )

    return (
        <>
            <h3 className={`auth__title ${errorState ? 'auth__title-errorUI' : ''}`}>
                Register
            </h3>

            {
                errorState &&
                <div className="auth__alert-error-ui">
                    {errorUIMessage}
                </div>
            }

            <form onSubmit={handleSubmit} autoComplete="off">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    autoComplete="off"
                    className={`auth__input ${formErrors.name.length > 0 ? 'auth__input-error' : ''}`} />

                {
                    formErrors.name.length > 0 &&
                    <p className="auth__alert-error">
                        {formErrors.name}
                    </p>
                }

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
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
                    name="password"
                    className={
                        `auth__input 
                        ${formErrors.password.length > 0 ?
                            'auth__input-error' : ''}`
                    } />

                {
                    formErrors.password.length > 0 &&
                    <p className="auth__alert-error">
                        {formErrors.password}
                    </p>
                }

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    className={
                        `auth__input ${formErrors.password.length > 0 ?
                            'auth__input-error' : ''}`
                    }
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    {
                        loading ?
                            <i className="fas fa-spinner fa-spin"></i>
                            :
                            "Register"
                    }
                </button>

                <hr className="mb-5"></hr>

                <Link onClick={handleLinkClick} className="link" to="/login" >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
