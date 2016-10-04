import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Импортируем редьюсеры
import App from './containers/App/AppReducer';
import Login from './routes/LoginReducer';

export default combineReducers({
    app: App,
    login: Login,
    routing: routerReducer
});