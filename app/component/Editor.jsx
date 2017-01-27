import React from 'react'
import CodeMirror from 'react-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import TabBar from './TabBar'
import './Editor.scss'

// theme
import 'codemirror/theme/dracula.css'

export default class Editor extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        const option = {
            lineNumbers: this.props.lineNumbers,
            mode: this.props.mode,
            theme: this.props.theme
        };

        return (
            <div>
                <TabBar tabs={this.props.tabs}/>
                <CodeMirror className="editor" value={this.props.text} options={option}
                            viewportMargin={Infinity} onChange={this.props.onChange}/>
            </div>
        );
    }
}

Editor.propTypes = {
    tabs: React.PropTypes.array,
    text: React.PropTypes.string,
    mode: React.PropTypes.string,
    theme: React.PropTypes.string,
    lineNumbers: React.PropTypes.bool,
    onChange: React.PropTypes.func
};

Editor.defaultProps = {
    lineNumbers: true,
    mode: "javascript",
    theme: "dracula"
};