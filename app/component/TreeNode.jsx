import React from 'react'
import {connect} from 'react-redux'
import Tree from './Tree'
import { treeNodeClicked } from '../action/treeAction'
import './style/TreeNode.scss'

class TreeNode extends React.Component {
    render(){
        return (
            <div className="tree-node" onClick={this.props.onClick.bind(this)}>
                <span className={`expend-icon glyphicon ${this._iconType()}`}/>
                <span>{this.props.name}</span>
                {(this.props.type === 'dir' && this.props.opened) ? <Tree root={this.props.children} indent={true}/> : ''}
            </div>
        );
    }

    _iconType(){
        if(this.props.type === 'file'){
            return 'glyphicon-file';
        }
        return this.props.opened ? 'glyphicon-folder-open': 'glyphicon-folder-close';
    }
}

TreeNode.propTypes = {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    path: React.PropTypes.string.isRequired,
    opened: React.PropTypes.bool,
    children: React.PropTypes.array,
    onClick: React.PropTypes.func
};

const dispatcher = (dispatch, props) => {
    return {
        onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();

            dispatch(treeNodeClicked(props.path, props.type, props.opened));
        }
    }
};

export default connect(null, dispatcher)(TreeNode);