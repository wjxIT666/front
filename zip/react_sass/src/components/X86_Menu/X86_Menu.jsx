import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu } from 'antd';
import menuList from '../../router/router.js';
const { Item } = Menu;

class X86_Menu extends Component {
    mode = 'inline';
    theme = 'light';
    componentDidMount () {
        
    };
    createMenu = (target) => {
        return target.map( item => {
            //没有子级
            if (!item.children) {
                return (
                    <Item key={item.key}>
                        <Link to={item.path}>{item.title}</Link>
                    </Item>
                );
            };
        } );
    };
    render () {
        return (
            <div>
                <Menu mode={this.mode} theme={this.theme} defaultSelectedKeys={this.props.location.pathname.split('/').reverse()[0]}>
                    {
                        this.createMenu(menuList)
                    }
                </Menu>
            </div>
        );
    };
};

export default withRouter(X86_Menu);
