import React, { Component } from 'react';

// Динамический инклюд компонента
import { injectAsyncReducer } from '../store/configureStore';

export function loadComp(param) {

    let

        CompPath = param.comp,
        CompReducerPath = param.reducers,
        CompName = param.name,
        CompBundleName = param.bundleName;

    return class dynamicComp extends Component {

        state = {
            comp: null
        }

        componentWillMount() {

            require.ensure([], () => {

                let Comp = require(`../../../../src/bundles/${CompBundleName}/resource/scripts/${CompPath}`).default,
                    CompReducer = require(`../../../../src/bundles/${CompBundleName}/resource/scripts/${CompReducerPath}`).default;

                injectAsyncReducer(CompName, CompReducer);

                this.setState({'comp': Comp});

            });

        }

        render() {

            return <div>{(typeof(this.state.comp) === 'function') && <this.state.comp />}</div>;

        }

    };

}