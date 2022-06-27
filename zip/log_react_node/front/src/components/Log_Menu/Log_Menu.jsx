import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import menuList from '../../router/router.js';
import { userInfo } from '../../request/api.js';
const { Item, SubMenu } = Menu;

class Log_Menu extends Component {
    mode = 'inline';
    theme = 'light';
    state = {
        menus: [],
        roleid: ''
    };
    //权限判断
    hasAuth = (item) => {
        const { key } = item;
        let { menus, roleid } = this.state;
        if (roleid === '99' || menus.indexOf(key) !== -1) {
            return true;
        } else if (item.children) {
            return !!item.children.find(child => menus.indexOf(child.key) !== -1);
        };
        return false;
    };
    //菜单
    createMenu = (target) => {
        return target.map(item => {
            if (this.hasAuth(item)) {
                //没有子级
                if (!item.children) {
                    return (
                        <Item key={item.key}>
                            <Link to={item.path}>{item.title}</Link>
                        </Item>
                    );
                } else {
                    //有子级
                    return (
                        <SubMenu key={item.key} title={item.title}>
                            {this.createMenu(item.children)}
                        </SubMenu>
                    );
                };
            }
        });
    };
    //初始化
    async componentDidMount () {
        let u_name = sessionStorage.getItem('u_name');
        let userInfoRes = await userInfo({u_name});
        let { code, data } = userInfoRes;
        if (code === 0) {
            this.setState({
                menus: [...data[0]['menuList']],
                roleid: data[0]['roleCode']
            });
            sessionStorage.setItem('menus', JSON.stringify(this.state.menus));
        };
    };
    render() {
        return (
            <div>
                <Menu mode={this.mode} theme={this.theme} defaultSelectedKeys={this.props.location.pathname.split('/').reverse()[0]}
                    selectedKeys={this.props.location.pathname.split('/').splice(2)}
                    defaultOpenKeys={this.props.location.pathname.split('/').splice(2)}
                >
                    {
                        this.createMenu(menuList)
                    }
                </Menu>
            </div>
        );
    };
};

export default withRouter(Log_Menu);