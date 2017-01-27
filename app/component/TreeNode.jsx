import React from 'react'
import dispatcher from '../dispatcher/AppDispatcher'
import Tree from './Tree'
import * as C from '../util/constants'
import './TreeNode.scss'

export default class TreeNode extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            expanded: false
        };
    }

    render(){
        return (
            <div className="tree-node" onClick={this.onClick.bind(this)}>
                <span className={`expend-icon glyphicon ${this.iconType()}`}/>
                <span>{this.props.name}</span>
                {this.state.expanded ? <Tree root={this.props.children} indent={true}/> : ''}
            </div>
        );
    }

    onClick(e){
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            expanded: !this.state.expanded
        });

        ////// DISPATCH ACTIONS //////
        if(this.props.type === 'dir'){
            dispatcher.dispatch({
                type: C.TREE_EXPAND_NODE,
                path: this.props.path
            });
        }else if(this.props.type === 'file'){
            dispatcher.dispatch({
                type: C.EDITOR_OPEN_FILE,
                path: this.props.path
            });
        }
        ////// DISPATCH DONE //////

        if(this.props.onClick) this.props.onClick();
    }

    iconType(){
        if(this.props.type === 'file'){
            return 'glyphicon-file';
        }
        return this.state.expanded ? 'glyphicon-folder-open': 'glyphicon-folder-close';
    }
}

TreeNode.propTypes = {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    path: React.PropTypes.string.isRequired,
    children: React.PropTypes.array,
    onClick: React.PropTypes.func
};