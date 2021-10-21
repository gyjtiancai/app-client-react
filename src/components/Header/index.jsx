import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import store from '@/store'
import './style.less';
import LogoIcon from './images/logo.png';
import { Select } from 'antd';
const { Option } = Select;
// by hooks
function Header(props) {
    const [activeNav, setNav] = useState(0);
    const [currentLanguage, setCurrentLanguage] = useState('CN');
    //hook副作用（目前理解为watch）
    useEffect(() => {
        store.dispatch({
            type: 'setLanguage',
            data: currentLanguage
        })
    })
    function changeNav(currentNav) {
        setNav(currentNav)
    }
    function selectChange(value) {
        setCurrentLanguage(value)
        store.dispatch({
            type: 'setLanguage',
            data: currentLanguage
        })
    }
    return <div className="app-header">
        <Link to="/">
            <div className="app-header-title">
                <img className="title-icon" src={LogoIcon} alt="" />
                <p className="title-label">{currentLanguage === 'CN' ? "葛宇杰的个人网站" : "Ge Yujie's personal website"}</p>
            </div>
        </Link>
        <div className="app-header-directory">
            <Link to="/home">
                <div className={`nav-item ${activeNav === 0 ? 'is-active' : ''}`} onClick={() => changeNav(0)}>{currentLanguage === 'CN' ? '主页' : 'Home'}</div>
            </Link>
            <div className="nav-item">
                <Select value={currentLanguage} style={{ width: 100 }} onChange={selectChange}>
                    <Option value="CN">{currentLanguage === 'CN' ? '中文' : 'chinese'}</Option>
                    <Option value="EN">{currentLanguage === 'CN' ? '英文' : 'english'}</Option>
                </Select></div>
        </div>
    </div>
}
export default Header