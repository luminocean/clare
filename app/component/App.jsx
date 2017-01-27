import React from 'react'
import Editor from './Editor'
import Tree from './Tree'
import dispatcher from '../dispatcher/AppDispatcher'
import treeStore from '../store/TreeStore'
import editorStore from '../store/EditorStore'
import * as C from '../util/constants'
import './App.scss'

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            root: [], // root items for tree view
            tabs: [], // tab data in tab bar
            text: '' // text in Editor
        };
        this.setupEventListeners();
    }

    componentDidMount(){
        // init the tree view once mounted
        dispatcher.dispatch({type: C.TREE_INIT});
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
                        <Editor tabs={this.state.tabs} text={this.state.text}/>
                    </div>
                </div>
            </div>
        );
    }

    setupEventListeners(){
        treeStore.addListener(C.TREE_DATA_UPDATED, (root) => this.setState({root: root}));
        editorStore.addListener(C.EDITOR_TEXT_LOADED, (path, text) => this.setState({text: text}));
        editorStore.addListener(C.EDITOR_TAB_UPDATED, (tabs) => this.setState({tabs: tabs}));
    }
}