// Модули react
import React from 'react';
import { render } from 'react-dom';

// Подключаем redux провайдер всего приложения
import { Provider } from 'react-redux';

/**
 * Роутинг приложения
 *
 */

// Реакт компонент роутинга
import { Router, browserHistory } from 'react-router';

// Компонент для связки реакт роутинга с redux
import { syncHistoryWithStore } from 'react-router-redux';

// Компонент роутинга нашего приложения
import { routes } from './routes/routes';

// Импортируем конфигуратор Store (внутри него редьюсеры всего приложения)
import configureStore from './store/configureStore';

const

    // Подключаем Store
    store = configureStore(),

    // Связываем history роутинга и redux
    reduxHistory = syncHistoryWithStore(browserHistory, store);

// Рендерим компонент
render(
    <Provider store={store}>
        <Router history={reduxHistory} routes={routes} />
    </Provider>,
    document.getElementById('app')
);