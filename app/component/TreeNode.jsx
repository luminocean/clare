import React from 'react'
import dispatcher from '../dispatcher/AppDispatcher'
import Tree from './Tree'
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

        dispatcher.dispatch({
            type: 'TREE_EXPAND_NODE',
            id: this.props.nodeId
        });

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
    nodeId: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    children: React.PropTypes.array,
    onClick: React.PropTypes.func
};