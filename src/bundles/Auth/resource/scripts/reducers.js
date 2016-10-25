const initialState = {
    fetching: false
};

export default function loginReducer(state = initialState, action) {

    switch (action.type) {

        case 'SENDING_AUTH': {

            let fetching = state.fetching;

            return {...state, fetching: !fetching};

        }

        default:
            return state;

    }

}