import React from 'react';
import { connect } from 'react-redux'
import './style.less';
import { Link } from 'react-router-dom';
// by hooks
function Welcome(props) {
    const { currentLanguage } = props
    return <div className="app-welcome">
        <p className="welcome-title">{currentLanguage === 'CN' ? '欢迎!' : 'Welcome!'}</p>
        <Link to="/home"><button className="welcome-button">{currentLanguage === 'CN' ? '去主页' : 'go home page'}</button></Link>
    </div>
}
//更新store视图方法
function mapStateToProps(state) {
    return {
        currentLanguage: state.common.currentLanguage
    }
}

export default connect(
    mapStateToProps,
)(Welcome)
// export default Welcome