import React, { Component } from 'react';
import { Card, message } from 'antd';
import LogInput from '../Log_Input/Log_Input.jsx';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import LogButton from '../Log_Button/Log_Button.jsx';
import { isEmpty } from '../../js/util.js';
import { login } from '../../request/api.js';
import { withRouter } from 'react-router-dom';

class Log_Card extends Component {
    state = {
        userIcon: <UserOutlined />,
        pwdIcon: <UnlockOutlined />,
        userVisibility: false,
        pwdVisibility: true,
        btnText: '登录',
        btnBlock: true,
        btnType: 'primary',
        userVal: '',
        pwdVal: ''
    };
    //文本框获取val
    getInpChange = (val) => {
        this.setState({
            userVal: val
        });
    };
    //密码框获取val
    getPwdChange = (val) => {
        this.setState({
            pwdVal: val
        });
    };
    //登录
    getBtnClick = async () => {
        let { userVal, pwdVal } = this.state;
        let userValRule = isEmpty(userVal, '用户名不能为空');
        let pwdValRule = isEmpty(pwdVal, '密码不能为空');
        if (!userValRule || !pwdValRule) return false;
        else {
            //请求登录接口
            let data = { userVal, pwdVal };
            let loginRes = await login(data);
            let { code, msg, token } = loginRes;
            if (code === 0) {
                //将token存储到sessionStorage中
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('u_name', userVal);
                //跳转首页
                this.props.history.push({
                    pathname: '/home/log/sync'
                });
                message.success(msg);
            } else if (code === 9) {
                message.error(msg);
            };
        };   
    };
    render () {
        let  { userIcon, pwdIcon, userVisibility, pwdVisibility, btnText, btnBlock, btnType } = this.state;
        let { cardWidth, cardBorder, cardTitle } = this.props;
        return (
            <div>
                <Card title={cardTitle} bordered={cardBorder} style={{ width: cardWidth }}>
                    {/* 用户名 */}
                    <LogInput prefix={userIcon} visibilityToggle={userVisibility} getInpChange={this.getInpChange}></LogInput>
                    {/* 密码 */}
                    <LogInput prefix={pwdIcon} visibilityToggle={pwdVisibility} getPwdChange={this.getPwdChange}></LogInput>
                    {/* 按钮 */}
                    <LogButton {...{btnText, btnBlock, btnType}} getBtnClick={this.getBtnClick}></LogButton>
                </Card>
            </div>
        );
    };
};

export default withRouter(Log_Card);
