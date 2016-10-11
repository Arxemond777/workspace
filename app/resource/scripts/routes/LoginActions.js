import axios from 'axios';

export function login() {

    return (dispatch) => {

        dispatch({
            type: 'SENDING',
            playload: true
        });

        axios
            .post('//api.localhost:3000/login')
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
            .post('//api.localhost:3000/auth/addUser', JSON.stringify({data: { aaa: {2: 3}}}))
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