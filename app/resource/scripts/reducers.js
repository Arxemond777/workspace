import { combineReducers } from 'redux';

// Редьюсеры роутера
import { routerReducer } from 'react-router-redux';

// Импортируем редьюсеры основного контейнера
import App from './containers/App/AppReducer';

/**
 * [
 *     createReducer функцию создания редьюсера
 *     В последствии мы на лету будем переинициализировать редьюсер
 *     братите внимание, в нем есть неизменяемый стейт (app, routing)
 *     и "подгружаемый" - dynamicReducers ввида {name: ОБЪЕКТ_С_ДАННЫМИ}
 *     это как бы переменный стейт, который будет обновляться, по вызову
 * ]
 *
 * @param  {[Object]} dynamicReducers [Передаем динамически полученный редьюсер]
 * @return {[Object]}                 [Возвращаем соединенный в один редьюсер]
 */
export default function createReducer(dynamicReducers) {

    return combineReducers({
        app: App,
        routing: routerReducer,
        ...dynamicReducers
    });

}