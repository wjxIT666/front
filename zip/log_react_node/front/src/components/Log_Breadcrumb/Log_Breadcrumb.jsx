import React, { Component } from 'react';
import './Log_Breadcrumb.less';
import { withRouter } from 'react-router-dom';
import menuList from '../../router/router.js';
import { Popover, Button, message } from 'antd';
import { exit, userInfo } from '../../request/api.js';

class Log_Breadcrumb extends Component {
    state = {
        TextContent: ''
    };
    async componentDidMount () {
        let u_name = sessionStorage.getItem('u_name');
        let userInfoRes = await userInfo({u_name});
        let { code, data } = userInfoRes;
        if (code === 0) {
            sessionStorage.setItem('u_name', data[0]['u_name']);
            sessionStorage.setItem('roleCode', data[0]['roleCode']);
            this.setState({
                TextContent: data[0]['u_name']
            });
        };
    };
    //退出
    logout = async () => {
        //调用退出接口
        let exitRes = await exit();
        let { code, msg } = exitRes;
        if (code === 0) {
            //清空token
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('u_name');
            sessionStorage.removeItem('roleCode');
            message.success(msg);
            //路径跳转
            this.props.history.push({
                pathname: '/'
            });
        };
    };
    render () {
        let { TextContent } = this.state;
        //响应面包屑
        let BreadcrumbName;
        let BreadcrumbNameList = [];
        BreadcrumbNameList = menuList.map( item => {
            if (item.children) {
                item.children.map( itemChild => {
                    if (itemChild.path === this.props.location.pathname) {
                        BreadcrumbName = itemChild.title;
                    } else if (this.props.location.pathname.startsWith('/home/log/config/detail')) {
                        BreadcrumbName = '日志条目';
                    };
                } );
            } else {
                if (item.path === this.props.location.pathname) return item.title;
            };
        } );
        BreadcrumbNameList.forEach( item => {
            if (item !== undefined) BreadcrumbName = item;
        } );

        //退出
        let content = <Button type="primary" size="small" onClick={this.logout}>退出</Button>;
        return (
            <div className="X86_BreadcrumbStyle">
                {/* 账号信息 */}
                <div className="X86_BreadcrumbAccount">
                    <Popover content={content}>
                        { TextContent }
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

export default withRouter(Log_Breadcrumb);