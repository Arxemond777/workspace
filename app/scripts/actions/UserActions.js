export function clickBtn() {

    return {
        type: 'CLICK_BTN',
        playload: Math.random()
    };

}

// Асинхронка

// Запрос на получение
export function getUserInfo() {

    return {
        type: 'GET_USER_INFO',
        playload: Math.random()
    };

}

// Обновление полученных данных
export function setUserInfo(data) {

    return {
        type: 'SET_USER_INFO',
        playload: data,
        recieveAt: Date.now()
    }

}