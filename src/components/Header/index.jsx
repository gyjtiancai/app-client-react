import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.less';
import LogoIcon from './images/logo.png';
// by hooks
function Header(props) {
    console.log(props)
    const [activeNav, setNav] = useState(0);
    function changeNav(currentNav) {
        console.log(currentNav)
        setNav(currentNav)
    }
    return <div className="app-header">
        <Link to="/">
            <div className="app-header-title">
                <img className="title-icon" src={LogoIcon} alt="" />
                <p className="title-label">个人网站</p>
            </div>
        </Link>
        <div className="app-header-directory">
            <div className={`nav-item ${activeNav === 0 ? 'is-active' : ''}`} onClick={() => changeNav(0)}>Home</div>
            <div className={`nav-item ${activeNav === 1 ? 'is-active' : ''}`} onClick={() => changeNav(1)}>Languages</div>
        </div>
    </div>
}

// by class
// class Header extends React.Component {
//     constructor(props) {
//         super(props);
//         console.log(props)
//         this.state = {
//             activeNav: 0
//         };
//     }
//     changeNav(currentNav) {
//         console.log(currentNav)
//         this.setState((state, props) => {
//             return {
//                 activeNav:currentNav
//             }
//         })
//     }    
//     render() {
//         const { activeNav } = this.state;
//         return <div className="app-header">
//         <div className="app-header-title">
//             <img className="title-icon" src={LogoIcon} alt="" />
//             <p className="title-label">个人网站</p>
//         </div>
//         <div className="app-header-directory">
//             <div className={`nav-item ${activeNav === 0?'is-active':''}`} onClick={()=>this.changeNav(0)}>Home</div>
//             <div className={`nav-item ${activeNav === 1?'is-active':''}`} onClick={()=>this.changeNav(1)}>Languages</div>
//         </div>
//    </div>
//     }
// }
export default Header