import { createStore } from 'redux';

// Редьюсеры
import rootReducer from '../reducers/index';

export default function configureStore(initialState) {

    const store = createStore(rootReducer, initialState);

    return store;

}