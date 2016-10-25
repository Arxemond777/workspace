export function login() {

    return (dispatch) => {

        dispatch({
            type: 'SENDING',
            playload: true
        });

        setTimeout(() => {

            dispatch({
                type: 'SENDING',
                playload: false
            });

        }, 2000);

    };

}