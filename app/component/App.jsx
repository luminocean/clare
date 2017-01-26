import React from 'react'

import Editor from './Editor';
import Tree from './Tree'
import dispatcher from '../dispatcher/AppDispatcher'

export default class App extends React.Component{
    componentDidMount(){
        // init tree view
        dispatcher.dispatch({
            type: 'TREE_INIT'
        });
    }

    render(){
        return (
            <div>
                <h3>Talk is cheap. Show me the code!</h3>
                <div className="row">
                    <div className="col-sm-4">
                        <Tree />
                    </div>
                    <div className="col-sm-8">
                        <Editor />
                    </div>
                </div>
            </div>
        );
    }
}