import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

let style = {
    margin: '20px',
    padding: '10px',
    border: '1px solid red'
};

class App extends Component {

    static propTypes = {
        children: PropTypes.element,
        app: PropTypes.object
    }

    render() {

        return (
            <div className="app">
                <div className="header" style={style}>
                    Шапка | Меню:
                    <Link to="/" onlyActiveOnIndex={true} activeClassName="active">Главная</Link> |&nbsp;
                    <Link to="login" activeClassName="active">Логин</Link> |&nbsp;
                    <Link to="asdasd" activeClassName="active">Пример 404</Link>
                </div>
                <div className="content" style={{...style, borderColor: 'green'}}>
                    {(!!this.props.children) ? this.props.children : 'Главная'}
                    <br/>
                    Данные с сервера:
                    <br/>
                    <pre>{JSON.stringify(this.props.app)}</pre>
                </div>
                <div className="footer" style={style}>Футер</div>
            </div>
        );

    }

}

const mapStateToProps = reduxStore => {

    return {
        app: reduxStore.app
    };

};

export default connect(mapStateToProps)(App);