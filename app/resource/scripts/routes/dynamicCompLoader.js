import React, { Component } from 'react';

// Динамический инклюд компонента
import { injectAsyncReducer } from '../store/configureStore';

export function loadComp(param) {

    let
        CompName = param.name,
        CompBundleName = param.bundleName;

    return class dynamicComp extends Component {

        state = {
            comp: null
        }

        componentWillMount() {

            require.ensure([], () => {

                let Comp = require(`../../../../src/bundles/${CompBundleName}/resource/scripts/${CompBundleName}`).default,
                    CompReducer = require(`../../../../src/bundles/${CompBundleName}/resource/scripts/reducers`).default;

                injectAsyncReducer(CompName, CompReducer);

                this.setState({'comp': Comp});

            });

        }

        render() {

            return <div>{(typeof(this.state.comp) === 'function') && <this.state.comp />}</div>;

        }

    };

}