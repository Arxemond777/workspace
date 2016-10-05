import React from 'react';
import { Route } from 'react-router';

import App from '../containers/App/App';
import LoginRoute from './LoginRoute';
import AuthAddUser from './AuthAddUser';
import NotFound from '../containers/NotFound/NotFound';

export const routes = (
    <Route path="/" component={App}>
        <Route path="login" component={LoginRoute} />
        <Route path="auth/addUser" component={AuthAddUser} />
        <Route path="*" component={NotFound} />
    </Route>
);