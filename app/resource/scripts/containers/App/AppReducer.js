/**
 * Глобальный редьюсер
 */

// Получаем глобальные данные из объекта,
// сгенерированного в index.html
const initialState = window.initialState || {};

export default function appReducer(state = initialState, action) {

    switch (action.type) {

        default:
            return state;

    }

}