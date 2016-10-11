import React, { Component, PropTypes } from 'react';

/**
 * ЭТО ВСЕ УЙДЕТ В БАНДЛ ЛОГИНА
 *
 * //api.host:3000/login - Логин
 *
 * //api.host:3000/auth/addUsers - Добавить пользователя
 *
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LoginActions from './LoginActions';

class LoginRoute extends Component {

    static propTypes = {
        loginActions: PropTypes.object,
        login: PropTypes.object
    };

    render() {

        return (
            <div>
                <h2>Форма чтобы зайти</h2>

                <div className="field">
                    <label>Логин: </label>
                    <input type="text" name="login" />
                </div>

                <div className="field">
                    <label>Пароль: </label>
                    <input type="text" name="pass" />
                </div>

                <div className="field">
                    <button onClick={this.props.loginActions.login}>Отправить</button>
                </div>

                <h3>Статус запроса: {this.props.login.fetching.toString()}</h3>
            </div>
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
)(LoginRoute);