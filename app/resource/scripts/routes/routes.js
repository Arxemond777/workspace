import React from 'react';
import { Route } from 'react-router';

import { loadComp } from './dynamicCompLoader';

import App from '../containers/App/App';
import NotFound from '../containers/NotFound/NotFound';

export const routes = (
    <Route path="/" component={App}>

        <Route path="login" getComponent={(locationRoute, callback) => {

            callback(null, loadComp({
                name: 'login',
                bundleName: 'Login',
                comp: 'LoginComp',
                reducers: 'LoginReducer'
            }));

        }} />

        <Route path="/auth/addUser" getComponent={(locationRoute, callback) => {

            callback(null, loadComp({
                name: 'auth',
                bundleName: 'Auth',
                comp: 'AuthComp',
                reducers: 'AuthReducer'
            }));

        }} />

        <Route path="*" component={NotFound} />
    </Route>
);