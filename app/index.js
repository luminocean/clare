import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './component/App'
import {appStore} from './store/store'
import {initTree} from './action/treeAction'

import 'bootstrap/dist/css/bootstrap.css'
import './index.scss'

// the unique store that is used throughout whole application
let store = appStore();

ReactDOM.render((
    <Provider store={store}>
        <App/>
    </Provider>
), document.getElementById('root'));

// initialize tree view
store.dispatch(initTree());