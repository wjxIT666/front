import React, { Component } from 'react';
import './Home.less';
import { Switch, Route } from 'react-router-dom';
import LogMenu from '../../components/Log_Menu/Log_Menu.jsx';
import LogBreadcrumb from '../../components/Log_Breadcrumb/Log_Breadcrumb.jsx';
import title from '../../images/title.png';
import LogSet from '../Log/LogSet/LogSet.jsx';
import CheckDetail from '../Log/LogSet/CheckDetail/CheckDetail.jsx';
import User from '../Permission/User/User.jsx';
import Role from '../Permission/Role/Role.jsx';

export default class Home extends Component {
    render () {
        return (
            <div className="HomeStyle">
                {/* 菜单 */}
                <div className="MenuStyle">
                    {/* 菜单标题 */}
                    <div className="MenuStyleTitle">
                        <img src={title}></img>
                    </div>
                    {/* 菜单内容 */}
                    <LogMenu></LogMenu>
                </div>
                {/* 列表 */}
                <div className="ListStyle">
                    {/* 面包屑 */}
                    <div className="ListCrumbs">
                        <LogBreadcrumb></LogBreadcrumb>
                    </div>
                    {/* 列表路由 */}
                    <Switch>
                       {/* 日志配置页面 */}
                       <Route path="/home/log/config/detail/:id" component={CheckDetail}></Route>
                       <Route path="/home/log/config" component={LogSet}></Route>
                       {/* 角色管理页面 */}
                       <Route path="/home/admin/role" component={Role}></Route>
                       {/* 用户管理页面 */}
                       <Route path="/home/admin/user" component={User}></Route>
                    </Switch>
                </div>
            </div>
        );
    };
};