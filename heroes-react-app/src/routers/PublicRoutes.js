import React from 'react'
import { Redirect, Route } from 'react-router'
import PropTypes from 'prop-types'

export const PublicRoutes = ({
    isAuthenticated,
    Component,
    ...rest
}) => {

    return (
        <Route {...rest}
               component={ props => 
                    !isAuthenticated
                    ? <Component {...props} />
                    : <Redirect to="/" />
               }
        />
    )
}

PublicRoutes.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    Component: PropTypes.func.isRequired
}
