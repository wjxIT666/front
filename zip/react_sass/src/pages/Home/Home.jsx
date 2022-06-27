import React, { Component } from 'react';
import './Home.less';
import { Switch, Route } from 'react-router-dom';
import X86Menu from '../../components/X86_Menu/X86_Menu.jsx';
import Apply from '../Apply/Apply.jsx';
import Cloud from '../Cloud/Cloud.jsx';
import Process from '../Process/Process.jsx';
import HistoryProcess from '../HistoryProcess/HistoryProcess.jsx';
import Account from '../Account/Account.jsx';
import title from '../../images/title.png';

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
                    <X86Menu></X86Menu>
                </div>
                {/* 列表 */}
                <div className="ListStyle">
                    {/* 列表路由 */}
                    <Switch>
                        {/* 应用设备 */}
                        <Route path="/home/apply" component={Apply}></Route>
                        {/* 云设备 */}
                        <Route path="/home/cloud" component={Cloud}></Route>
                        {/* 实时进程 */}
                        <Route path="/home/process" component={Process}></Route>
                        {/* 历史进程 */}
                        <Route path="/home/historyProcess" component={HistoryProcess}></Route>
                        {/* 账号管理 */}
                        <Route path="/home/account" component={Account}></Route>
                    </Switch>
                </div>
            </div>
        );
    };
};
