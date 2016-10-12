import { createStore, applyMiddleware } from 'redux';

// Возможность посылать асинхронные actions
import thunk from 'redux-thunk';

// Функция создания редьюсера для глобального стора
import createReducer from '../reducers';

// Создаем копию стора
// потом будем к ней обращаться,
// при подгрузке новых модулей
let storeInstance = null;

/**
 * [
 *     configureStore функция вызывается один раз, в момент начального конфигурирования стора.
 *     Она возвращает первоначальный стор для редакс окружения
 *     Там же, конфигурируем переменные, для динамической подгрузки
 * ]
 *
 * @param  {[Object || null || undefined]} initialState [Объект значений по-умолчанию стора]
 * @return {[Object]} [Возвращает объект стора (он то и подключается в контейнер Provider)]
 */
export default function configureStore(initialState) {

    // Создаем наш стор
    const store = createStore(

        // Передаем редьюсеры
        createReducer(),

        // Передаем начальное состояние стейта
        initialState,

        // Подключаем промежуточные обработчики
        applyMiddleware(thunk)
    );

    // Расширяем стор свойством,
    // в котором будем хранить динамически загруженные редьюсеры
    store.dynamicReducers = {};

    // Копируем стор в переменную
    storeInstance = store;

    // Возвращаем полученный стор
    return store;

}

/**
 * [
 *     injectAsyncReducer Функция для динамического добавления редьюсеров модулей
 *     Эту функцию мы будем использовать в связке, когда будем динамически подключать
 *     компоненты приложения.
 *     - Подключается компонент
 *     - Иньектятся данные этого компонента в редьюсер
 *
 *     Пока реализовано так, что старые редьюсеры остаются, и перезаписываются,
 *     если их опять грузим
 *
 *     Дополнительная информация тут: gist.github.com/gaearon/0a2213881b5d53973514
 *
 * ]
 * @param  {[Object]} store           [Объект стора приложения на данный момент]
 * @param  {[String]} name            [Имя подгружаемого модуля]
 * @param  {[Object]} dynamicReducers [Редьюсеры подгружаемого модуля]
 * @return {[undefined]}
 */
export function injectAsyncReducer(reducerName, dynamicReducers) {

    // Сохраняем с свойсте стора ссылку на редьюсер
    storeInstance.dynamicReducers[reducerName] = dynamicReducers;

    // Заменяем редьюсер, склеивая страые редьюсеры с новым, загруженным
    storeInstance.replaceReducer(createReducer(storeInstance.dynamicReducers));

}