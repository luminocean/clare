import React from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import './Editor.scss'

// theme
import 'codemirror/theme/dracula.css'

export default class Editor extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            code: "// Code Here...",
            options: {
                lineNumbers: true,
                mode: "javascript",
                theme: "dracula"
            }
        };
    }

    updateCode(newCode) {
        this.setState({
            code: newCode,
        });
    }

    render() {
        this.state.codeMirror = (
            <CodeMirror
                value={this.state.code}
                onChange={this.updateCode.bind(this)}
                options={this.state.options} />
        );

        return this.state.codeMirror;
    }
}