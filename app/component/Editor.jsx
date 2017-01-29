import React from 'react'
import CodeMirror from 'react-codemirror'
import {connect} from 'react-redux'
import TabBar from './TabBar'
import * as actions from '../action/editorAction'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import './Editor.scss'

// theme
import 'codemirror/theme/dracula.css'

class Editor extends React.Component{
    render() {
        const option = {
            lineNumbers: this.props.lineNumbers,
            mode: this.props.mode,
            theme: this.props.theme
        };

        let focusedBuffer = this.props.buffers.find((b) => b.focused);

        return (
            <div>
                <TabBar onClose={this.props.onClose} buffers={this.props.buffers}/>

                <CodeMirror className="editor" options={option}
                            viewportMargin={Infinity} onChange={(text) => this.props.onChange(focusedBuffer.path, text)}
                            value={focusedBuffer?focusedBuffer.text:''} />
            </div>
        );
    }
}

Editor.propTypes = {
    buffers: React.PropTypes.array,
    onChange: React.PropTypes.func,

    text: React.PropTypes.string,
    mode: React.PropTypes.string,
    theme: React.PropTypes.string,
    lineNumbers: React.PropTypes.bool
};

Editor.defaultProps = {
    lineNumbers: true,
    mode: "javascript",
    theme: "dracula"
};

const dispatcher = (dispatch) => {
    return {
        onChange: (path, text) => {
            dispatch(actions.textModified(path, text));
        }
    }
};

export default connect(null, dispatcher)(Editor);