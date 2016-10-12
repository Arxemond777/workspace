import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AuthActions from './AuthActions';

class AuthComp extends Component {

    static propTypes = {
        authActions: PropTypes.object,
        auth: PropTypes.object
    };

    render() {

        return (
            <div>
                <h2>Форма обавления юзера</h2>

                <div className="field">
                    <label>email: </label>
                    <input type="text" name="login" />
                </div>

                <div className="field">
                    <button onClick={this.props.authActions.addUser}>Отправить</button>
                </div>

                <h3>Статус запроса: {this.props.auth.fetching.toString()}</h3>
            </div>
        );

    }

}

const

    mapStateToProps = reduxStore => {

        return {
            auth: reduxStore.auth
        };

    },

    mapDispatchToProps = dispatch => {

        return {
            authActions: bindActionCreators(AuthActions, dispatch)
        };

    };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthComp);