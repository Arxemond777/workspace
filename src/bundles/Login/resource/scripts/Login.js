import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from './LoginActions';

class Form extends Component {

    constructor(props) {

        super(props);

        console.log(props);

    }

    mySubmit(e) {

        console.log(e);

    }

    render() {

        const { handleSubmit } = this.props;

        return (

            <form onSubmit={handleSubmit(::this.mySubmit)}>

                <Field name="nameUser" component="input" type="text" />
                <br/>
                <br/>
                <button type="submit">Log in</button>

            </form>

        );

    }

};

Form = reduxForm({ form: 'loginForm' })(Form);

class Login extends Component {

    static propTypes = {
        loginActions: PropTypes.object,
        login: PropTypes.object
    };

    render() {

        return (
           <Form />
        );

    }

}

const

    mapStateToProps = reduxStore => {

        return {
            login: reduxStore.login
        };

    },

    mapDispatchToProps = dispatch => {

        return {
            loginActions: bindActionCreators(LoginActions, dispatch)
        };

    };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);