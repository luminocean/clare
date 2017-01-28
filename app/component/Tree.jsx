import React from 'react'
import {connect} from 'react-redux'
import TreeNode from './TreeNode'
import './Tree.scss'

class Tree extends React.Component {
    render() {
        return (
            <div className={`tree-view ${this.props.indent ? 'tree-indent':''}`}>
                {this.props.root.map((item) =>
                    <TreeNode key={item.path} name={item.name} opened={item.opened}
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

export default connect()(Tree);