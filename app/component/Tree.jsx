import React from 'react'
import TreeView from 'treeview-react-bootstrap';

export default class Tree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.state.data = [
            {
                text: 'a',
                type: 'dir',
                children: [
                    {
                        text: 'a1',
                        type: 'file'
                    },{
                        text: 'a2',
                        type: 'file'
                    },{
                        text: 'a2',
                        type: 'file'
                    },
                ]
            },{
                text: 'b',
                type: 'dir'
            },{
                text: 'c',
                type: 'dir'
            }
        ];
    }

    render() {
        return <TreeView data={this.dataToNodes(this.state.data)} selectable={false} />
    }

    dataToNodes(data = []){
        return data.map((datum) => {
            if (datum.type === 'file') {
                return {
                    text: datum.text,
                    icon: 'glyphicon glyphicon-file'
                }
            }

            if (datum.type === 'dir') {
                return {
                    text: datum.text,
                    icon: 'glyphicon glyphicon-folder-close',
                    expandedIcon: 'glyphicon glyphicon-folder-open',
                    nodes: this.dataToNodes(datum.children)
                }
            }

            console.error(`Unknown datum type ${datum.type}`);
        });
    }
}