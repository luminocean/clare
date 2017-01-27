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
                    <TreeNode key={item.path} name={item.name}
                              type={item.type} children={item.children} path={item.path}/>
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