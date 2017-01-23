import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './component/Editor';

import 'bootstrap/dist/css/bootstrap.css'
import './index.scss'

ReactDOM.render((
    <div>
        <h1>Hi</h1>
        <Editor/>
    </div>
), document.getElementById('root'));