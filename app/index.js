import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './component/Editor';
import Tree from './component/Tree'

import 'bootstrap/dist/css/bootstrap.css'
import './index.scss'

ReactDOM.render((
    <div>
        <h3>Talk is cheap. Show me the code!</h3>
        <div className="row">
            <div className="col-sm-4">
                <Tree/>
            </div>
            <div className="col-sm-8">
                <Editor/>
            </div>
        </div>
    </div>
), document.getElementById('root'));