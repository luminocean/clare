import React from 'react'
import Editor from './Editor';
import Tree from './Tree'
import dispatcher from '../dispatcher/AppDispatcher'
import treeStore from '../store/TreeStore';

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          root: []
        };
        this.setupEventListeners();
    }

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
                        <Tree root={this.state.root}/>
                    </div>
                    <div className="col-sm-8">
                        <Editor />
                    </div>
                </div>
            </div>
        );
    }

    setupEventListeners(){
        treeStore.addListener('TREE_DATA_UPDATED', (root) => {
            this.setState({
                root: root
            });
        });
    }
}