import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            menuData: [{
                key: '1',
                title: 'Navigation One',
                icon: <AppstoreOutlined />,
                children: [
                    { key: '1-1', title: 'option 1', link: '/two', },
                    { key: '1-2', title: 'option 2', link: '/two', },
                    { key: '1-3', title: 'option 3', link: '/two', }
                ],
            }, {
                key: '2',
                title: 'Navigation Two',
                icon: <MailOutlined />,
                children: [
                    { key: '2-1', title: 'option 4', link: '/two' },
                    { key: '2-2', title: 'option 5', link: '/two' },
                ],
            }, { key: '3', title: 'Navigation three', link: '/home', },
            ],
            submenuKeys: ['1', '2'],
            openKeys: ['1']
        }
    }
    subMenuClickHandler = ({ key, domEvent }) => {
        console.log({ key, domEvent })
        this.setState((state, props) => {
            return {
                openKeys: state.submenuKeys.filter(submenuKey => submenuKey === key)
            }
        })
    }
    menuItemClickHandler = ({ item, key, keyPath, domEvent }) => {
        console.log({ item, key, keyPath, domEvent })
    }
    render() {
        const { menuData, openKeys } = this.state
        return (
            <Menu mode="inline" openKeys={openKeys} onClick={this.menuItemClickHandler} style={{ width: 220 }}>
                {menuData.map((subMenu) => {
                    if (subMenu.children) {
                        return <SubMenu key={subMenu.key} icon={subMenu.icon} title={subMenu.title} onTitleClick={this.subMenuClickHandler}>
                            {
                                subMenu.children.map((menuItem) =>
                                    <Menu.Item key={menuItem.key}>
                                        <Link key={menuItem.key} to={menuItem.link}>{menuItem.title}</Link>
                                    </Menu.Item>)
                            }
                        </SubMenu>
                    } 
                    else {
                        return <Menu.Item key={subMenu.key}><Link key={subMenu.key} to={subMenu.link}>{subMenu.title}</Link></Menu.Item>
                    }
                })
                }
            </Menu>
        )
    }
}
export default Sidebar