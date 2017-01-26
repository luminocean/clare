import React from 'react'
import TreeNode from './TreeNode'
import './Tree.scss'

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tree-view">
                {this.props.root.map((item) =>
                    <TreeNode key={item.id} nodeId={item.id} name={item.name} type={item.type}/>
                )}
            </div>
        );
    }
}

Tree.propTypes = {
    root: React.PropTypes.array
};

Tree.defaultProps = {
    root: []
};