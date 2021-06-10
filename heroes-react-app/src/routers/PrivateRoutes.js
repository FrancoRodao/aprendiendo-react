import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types'

export const PrivateRoutes = ({
    isAuthenticated,
    Component,
    ...rest
}) => {

    localStorage.setItem("lastPath", rest.location.pathname)

    return (
        <Route {...rest}
               component={ props => 
                    isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to="/login" />
               }
        />
    )
}

PrivateRoutes.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    Component: PropTypes.func.isRequired
}
