import React from 'react'
import './TabBar.scss'

export default class TabBar extends React.Component{
    render(){
        return (
            <div className="tab-bar">
                {this.props.tabs.map((tab) => (
                    <span className={`tab ${tab.focused?'focused':''}`} key={tab.path}>{tab.name}</span>
                ))}
            </div>
        );
    }
}

TabBar.propTypes = {
    tabs: React.PropTypes.array
};

TabBar.defaultProps = {
    tabs: []
};