import React from 'react'
import {connect} from 'react-redux'
import Editor from './Editor'
import Tree from './Tree'
import ControlBar from './ContolBar'
import './style/App.scss'

class App extends React.Component{
    render(){
        return (
            <div>
                <p className="banner">Talk is cheap. Show me the code!</p>
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-2">
                        <Tree root={this.props.tree}/>
                    </div>
                    <div className="col-sm-9">
                        <div className="row">
                            <ControlBar />
                            <Editor buffers={this.props.buffers}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const state2props = (state) => {
    return {
        tree: state.tree.root,
        buffers: state.editor.buffers
    };
};

export default connect(state2props)(App);