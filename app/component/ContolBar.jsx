import React from 'react'
import {connect} from 'react-redux'
import './style/ControlBar.scss'

class ControlBar extends React.Component{
    render(){
        return (
            <div className="control-bar"></div>
        );
    }
}

export default connect()(ControlBar);