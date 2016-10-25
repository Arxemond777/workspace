const initialState = {
    user: 'Аноним',
    fetching: false
};

export default function loginReducer(state = initialState, action) {

    switch (action.type) {

        case 'SENDING': {

            return {...state, fetching: action.playload};

        }

        default:
            return state;

    }

}