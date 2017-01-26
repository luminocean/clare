import React from 'react'
import Editor from './Editor'
import Tree from './Tree'
import dispatcher from '../dispatcher/AppDispatcher'
import treeStore from '../store/TreeStore'
import editorStore from '../store/EditorStore'
import './App.scss'

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            root: [], // root items for tree view
            text: '' // text in Editor
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
                <p className="banner">Talk is cheap. Show me the code!</p>
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-2">
                        <Tree root={this.state.root}/>
                    </div>
                    <div className="col-sm-9">
                        <Editor text={this.state.text}/>
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

        editorStore.addListener('EDITOR_FILE_LOADED', (text) => {
            this.setState({
                text: text
            });
        })
    }
}