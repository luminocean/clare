import React from 'react'
import TreeNode from './TreeNode'
import './Tree.scss'

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`tree-view ${this.props.indent ? 'tree-indent':''}`}>
                {this.props.root.map((item) =>
                    <TreeNode key={item.id} nodeId={item.id} name={item.name}
                              type={item.type} children={item.children}/>
                )}
            </div>
        );
    }
}

Tree.propTypes = {
    root: React.PropTypes.array,
    indent: React.PropTypes.bool
};

Tree.defaultProps = {
    root: [],
    indent: false
};