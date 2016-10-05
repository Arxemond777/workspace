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

class AuthAddUser extends Component {

    static propTypes = {
        loginActions: PropTypes.object,
        login: PropTypes.object
    };

    render() {

        return (
            <div>


        <h2>Форма регистрации</h2>

        <div className="field">
            <label>email: </label>
        <input type="text" name="email" />
            </div>

            <div className="field">
            <label>Имя: </label>
        <input type="text" name="f_name" />
            </div>

            <div className="field">
            <label>Фамилия: </label>
        <input type="text" name="s_name" />
            </div>

            <div className="field">
            <label>Пароль: </label>
        <input type="text" name="pass" />
            </div>

            <div className="field">
            <button onClick={this.props.loginActions.addUser}>Отправить</button>
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
)(AuthAddUser);