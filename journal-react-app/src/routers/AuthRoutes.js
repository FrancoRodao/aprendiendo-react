import React from 'react'
import PropTypes from 'prop-types'; // ES6
import { Switch, Redirect } from 'react-router-dom'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import PublicRoute from './PublicRoute';

export default function AuthRoutes({
    isAuthenticated
}) {

    return (

        <div className="auth__main">
            <div className="auth__box-container">

                <Switch>

                    <PublicRoute path="/login" 
                                 component={LoginScreen} 
                                 isAuthenticated={isAuthenticated}
                    />

                    <PublicRoute path="/register" 
                                 component={RegisterScreen} 
                                 isAuthenticated={isAuthenticated}
                    />

                    <Redirect to="/" />

                </Switch>

            </div>
        </div>


    )
}

AuthRoutes.propTypes = {
    isAuthenticated: PropTypes.bool
}