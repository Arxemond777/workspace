import React, { PropTypes, Component } from 'react';

// Подключает компонент к redux стору
import { connect } from 'react-redux';

// Вспомогательная функция для обработки actions
import { bindActionCreators } from 'redux';

// Подключаем actions
import * as userActions from '../actions/UserActions';

class App extends Component {

    onClickBtn(e) {

        this.props.userActions.clickBtn(e);

    }

    getUserInfo(e) {

        this.props.userActions.getUserInfo(e);

    }

    render() {

        return (
            <div className="app">
                Привет, { this.props.user.name },<br />твой id: { this.props.user.id }<br />информация: { this.props.user.info }<br />
                <button onClick={::this.onClickBtn}>кнопка</button><br />
                <button onClick={::this.getUserInfo}>подгрузить данные юзера</button>
            </div>
        );

    }

}

// Объявляем типизацию свойств компонента
App.propTypes = {
    user: PropTypes.object,
    userActions: PropTypes.object,
    clickBtn: PropTypes.func
};

// функция передает стейты в props компонентов
// Получаем мы их из reducers
function mapStateToProps(state) {

    return {
        user: state.user
    };

}

// связываем actions с props
function mapDispatchToPropd(dispatch) {

    return {
        userActions: bindActionCreators(userActions, dispatch)
    };

}

export default connect(mapStateToProps, mapDispatchToPropd)(App);