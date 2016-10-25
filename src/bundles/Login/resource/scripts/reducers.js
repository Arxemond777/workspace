import { combineReducers } from 'redux';

import loginReducer from './reducers/login';
import formReducer from './reducers/forms';

const reducers = {
    login: loginReducer,
    form: formReducer
};

export default combineReducers(reducers);