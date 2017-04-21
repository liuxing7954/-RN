'use strict';
import React, {Component} from 'react';


import {Provider} from 'react-redux';
import store from './stores/Store';

import App from './pages/App';

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}