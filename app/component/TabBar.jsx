import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../action/editorAction'
import './TabBar.scss'

class TabBar extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="tab-bar">
                {this.props.buffers.map((buffer) => (
                    <span className={`tab ${buffer.focused ? 'focused' : ''}`} key={buffer.path}
                          onClick={() => this.props.onClick(buffer.path)}>
                        <span className={`tab-name ${buffer.changed?'changed':''}`}>
                            {buffer.name}
                        </span>
                        <span className="close-btn glyphicon glyphicon-remove"
                              onClick={() => this.props.onClose(buffer.path)} />
                    </span>
                ))}
            </div>
        );
    }
}

TabBar.propTypes = {
    tabs: React.PropTypes.array,
    onClose: React.PropTypes.func,
    onClick: React.PropTypes.func,
};

TabBar.defaultProps = {
    tabs: []
};

const dispatcher = (dispatch) => {
    return {
        onClick: (path) => {
            dispatch(actions.chooseFile(path));
        },
        onClose: (path) => {
            dispatch(actions.closeFile(path));
        }
    }
};

export default connect(null, dispatcher)(TabBar);