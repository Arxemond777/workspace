const initialState = {
    name: 'Аноним',
    id: null,
    info: ''
};

export default function userstate(state = initialState, action) {

    switch (action.type) {

        case 'CLICK_BTN':
            return {
                ...state,
                id: action.playload
            };

        case 'GET_USER_INFO':
            return {
                ...state,
                info: action.playload
            };

        default:
            return state;

    }


}

