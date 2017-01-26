import React from 'react'
import TreeView from 'treeview-react-bootstrap';
import treeStore from '../store/TreeStore';

import './Tree.scss'

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };

        treeStore.addListener('TREE_DATA_UPDATED', (items) => {
            this.setState({
                items: items
            });
        });
    }

    render() {
        return <TreeView
                    data={this.data2Nodes(this.state.items)}
                    selectable={false} />
    }

    data2Nodes(items = []){
        return items.map((item) => {
            if (item.type === 'file') {
                return {
                    text: item.name,
                    icon: 'glyphicon glyphicon-file'
                }
            }

            if (item.type === 'dir') {
                return {
                    text: item.name,
                    icon: 'glyphicon glyphicon-folder-close',
                    collapseIcon: 'glyphicon glyphicon-folder-open',
                    nodes: this.data2Nodes(item.nodes)
                }
            }

            console.error(`Unknown item type ${item.type}`);
        });
    }
}

Tree.propTypes = {
    data: React.PropTypes.array
};

Tree.defaultProps = {
    data: []
};