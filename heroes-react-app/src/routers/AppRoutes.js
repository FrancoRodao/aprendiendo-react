import React from "react";
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import { Navbar } from "../components/ui/Navbar";
import DashboardRoutes from "./DashboardRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { AuthContext } from "../auth/authContext";
import { useContext } from 'react'
import { PublicRoutes } from "./PublicRoutes";



export default function AppRouter() {

    const { user } = useContext(AuthContext)

    return (
        <Router>
            <Navbar />

            <Switch>

                <PublicRoutes
                    path="/login"
                    exact
                    Component={LoginScreen}
                    isAuthenticated={user.logged}
                />    

                <PrivateRoutes
                    path="/"
                    Component={DashboardRoutes}
                    isAuthenticated={user.logged}
                />

            </Switch>
        </Router>
    )
}
