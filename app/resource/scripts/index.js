// Модули react
import React from 'react';
import { render } from 'react-dom';

// Модули redux
import { Provider } from 'react-redux';

// Роутинг
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { routes } from './routes/routes';

// Импортируем конфигуратор Store
import configureStore from './store/configureStore';

const

    // Подключаем Store
    store = configureStore(),

    // Связываем history и redux
    reduxHistory = syncHistoryWithStore(browserHistory, store);

// Рендерим компонент
render(
    <Provider store={store}>
        <Router history={reduxHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);