import axios from 'axios';

export function login() {

    return (dispatch) => {

        dispatch({
            type: 'SENDING',
            playload: true
        });

        axios
            .get('//api.10.11.112.169:3000/login')
            .then((res) => {

                console.log(res);

                dispatch({
                    type: 'SENDING',
                    playload: false
                });

            })
            .catch((error) => {

                dispatch({
                    type: 'SENDING',
                    playload: false
                });

                console.error(error);

            });

    };

}

export function addUser() {

    return (dispatch) => {

        dispatch({
            type: 'SENDING',
            playload: true
        });

        axios
            .get('//api.10.11.112.169:3000/auth/addUsers')
            .then((res) => {

                console.log(res);

                dispatch({
                    type: 'SENDING',
                    playload: false
                });

            })
            .catch((error) => {

                dispatch({
                    type: 'SENDING',
                    playload: false
                });

                console.error(error);

            });

    };

}