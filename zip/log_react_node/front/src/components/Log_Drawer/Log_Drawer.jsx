import React, { Component } from 'react';
import { Drawer, Tree } from 'antd';
import menuList from '../../router/router.js';

export default class Log_Drawer extends Component {
    state = {
        treeMenu: []
    };
    //抽屉关闭
    onClose = () => {
        this.props.drawerClose(false);
    };
    //点击复选框触发
    onCheck = (arr, e) => {
        // console.log(e);
        this.props.treeCheck(arr);
    };
    componentDidMount () {
        let menus = JSON.parse(sessionStorage.getItem('menus'));
        console.log(menus);
        let logItem = {};
        logItem.children = [];
        let adminItem = {};
        adminItem.children = [];
        let setItem = {};
        menuList.forEach( menuListItem => {
            if (menuListItem.children) {
                menuListItem.children.forEach( childItem => {
                    menus.forEach( menusItem => {
                        if (menuListItem.key === menusItem) {
                            if (childItem.key === menusItem) {
                                if (menusItem === 'log') {
                                    logItem.title = '日志系统';
                                    logItem.key = menusItem;
                                    logItem.children.push(childItem);
                                } else if (menusItem === 'admin') {
                                    adminItem.title = '权限';
                                    adminItem.key = menusItem;
                                    adminItem.children.push(childItem);
                                };
                            };
                        } else if (childItem.key === menusItem) {
                            if (menusItem === 'sync' || menusItem === 'query' || menusItem === 'config') {
                                logItem.title = '日志系统';
                                logItem.key = 'log';
                                logItem.children.push(childItem);
                            } else if (menusItem === 'role' || menusItem === 'user') {
                                adminItem.title = '权限';
                                adminItem.key = 'admin';
                                adminItem.children.push(childItem);
                            };
                        };
                    } );
                } );
            } else {
                menus.forEach( menusItem => {
                    if (menusItem.indexOf(menuListItem.key) > -1) {
                        setItem.title = '设置';
                        setItem.key = menusItem;
                        setItem.path = `/home/${menusItem}`;
                    };
                } );
            };
        } );
        //数组去重
        logItem.children = Array.from(new Set(logItem.children));
        adminItem.children = Array.from(new Set(adminItem.children));
        this.setState({
            treeMenu: [logItem, adminItem, setItem]
        });
    };
    render() {
        let { drawerTitle, placement, visible } = this.props;
        let { treeMenu } = this.state;
        //过滤菜单空对象
        treeMenu = treeMenu.filter( (item, index) => {
            if (JSON.stringify(item) !== '{}') {
                return item;
            };
        } );
        console.log(treeMenu, 'treeMenu');
        return (
            <div>
                <Drawer title={drawerTitle} placement={placement} onClose={this.onClose} visible={visible}>
                    <Tree
                        checkable
                        onCheck={this.onCheck}
                        treeData={treeMenu}
                    />
                </Drawer>
            </div>
        );
    };
};
