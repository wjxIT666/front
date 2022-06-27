import React, { Component } from 'react';
import './X86_Breadcrumb.less';
import { withRouter } from 'react-router-dom';
import menuList from '../../router/router.js';
import { Popover, message } from 'antd';
import X86Button from '../X86_Button/X86_Button.jsx';
import store from '../../redux/store.js';
import { exitLoginKP } from '../../request/api.js';

class X86_Breadcrumb extends Component {
    applyButtonExit = '退出登录';
    //退出登录
    exitLogin = async () => {
        let exitLoginRes = await exitLoginKP();
        let { code, msg } = exitLoginRes;
        if (code === 0) message.success('退出成功');
        else message.error(msg);
        //清空token
        sessionStorage.removeItem('token');
        //路径跳转--登录页
        this.props.history.push({
            pathname: '/'
        });
    };
    render () {
        // 响应面包屑
        let BreadcrumbName;
        let BreadcrumbNameList = [];
        BreadcrumbNameList = menuList.map( item => {
            if (item.path === this.props.location.pathname) return item.title;
        } );
        BreadcrumbNameList.forEach( item => {
            if (item === '账号管理') item = '账号信息';
            if (item !== undefined) BreadcrumbName = item;
        } );
        //气泡卡片内容
        let content = (
            <div>
                <X86Button applyButtonText={this.applyButtonExit} getBtnValue={this.exitLogin}></X86Button>
            </div>
        );
        //redux数据
        let userName = store.getState();
        return (
            <div className="X86_BreadcrumbStyle">
                {/* 账号信息 */}
                <div className="X86_BreadcrumbAccount">
                    <Popover content={content} trigger="hover">
                        <span>{userName}</span>
                    </Popover>
                </div>
                {/* 面包屑 */}
                <div>
                    { BreadcrumbName }
                </div>
            </div>
        );
    };
};

export default withRouter(X86_Breadcrumb);
