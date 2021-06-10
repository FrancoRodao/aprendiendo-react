import React from 'react'
import PropTypes from 'prop-types'; // ES6
import { Redirect, Route } from 'react-router'

export default function PrivateRoute({
    isAuthenticated,
    component,
    ...rest
    }) {



    return (
        isAuthenticated ? 
            <Route component={component} {...rest} />
            :
            <Redirect to="/login" />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
    component: PropTypes.elementType
}
