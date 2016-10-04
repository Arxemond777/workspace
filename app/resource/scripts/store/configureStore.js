import { createStore, applyMiddleware } from 'redux';

// Возможность посылать асинхронные actions
import thunk from 'redux-thunk';

// Редьюсеры
import rootReducer from '../reducers';

export default function configureStore(initialState) {

    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );

    return store;

}