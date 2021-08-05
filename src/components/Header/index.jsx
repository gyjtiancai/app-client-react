import React from 'react';
import './style.less';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (<div className="app-header">{this.props.appName}</div>)
    }
}
export default Header