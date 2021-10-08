import React from 'react';
import './style.less';
import { Link } from 'react-router-dom';
// by hooks
function Welcome(props) {
    console.log('welcome')
    return <div className="app-welcome">
        <p className="welcome-title">Welcome!</p>
        <Link to="/home"><button className="welcome-button">gogogo</button></Link>
    </div>
}
export default Welcome