import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import MarvelScreen from "../screens/MarvelScreen";
import HeroeScreen from "../screens/HeroScreen";
import dcScreen from '../screens/DcScreen';
import SearchScreen from '../screens/SearchScreen';


export default function DashboardRoutes() {
    return (
        <Switch>
            <Route exact path="/marvel" component={MarvelScreen} />
            <Route exact path="/dc" component={dcScreen} />
            <Route exact path="/heroe/:heroeId" component={HeroeScreen} />
            <Route exact path="/search" component={SearchScreen} />

            <Redirect to="/marvel" />
        </Switch>
    )
}
