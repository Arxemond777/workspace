// Модули react
import React from 'react';
import { render } from 'react-dom';

// Модули redux
import { Provider } from 'react-redux';

// Импортируем глобальный компонент приложения
import App from './containers/App';

// Импортируем конфигуратор Store
import configureStore from './store/configureStore';

// Подключаем Store
const store = configureStore();

// Инициализация приложения
(() => {

    // Рендерим компонент
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app')
    );

})();