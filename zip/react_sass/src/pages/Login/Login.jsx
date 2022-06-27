import React, { Component } from 'react';
import './Login.less';
import X86Input from '../../components/X86_Input/X86_Input.jsx';
import X86Button from '../../components/X86_Button/X86_Button.jsx';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import logo from '../../images/logo.png';
import { loginKP, userKP } from '../../request/api';
import { message, Input } from 'antd';
import store from '../../redux/store.js';
import { getAccount } from '../../redux/action_creator.js';
const { Password } = Input;

export default class Login extends Component {
    inputSize = 'middle';
    userPlaceholder = '请输入用户名';
    passwordPlaceholder = '请输入密码';
    userPreFix = <UserOutlined />;
    passwordPreFix = <UnlockOutlined />;
    applyButtonType = 'primary';
    applyButtonLogin = '登录';
    blockBtn = true;
    state = {
        userName: '',
        getPassWordValue: ''
    };
    //用户名
    getUserNameValue = (inpVal) => {
        this.setState({
            userName: inpVal
        });
    };
    //密码
    getPassWordValue = (e) => {
        this.setState({
            getPassWordValue: e.target.value
        });
    };
    //登录
    getBtnLogin = async () => {
        let { userName, getPassWordValue } = this.state;
        let params = { userName, password: getPassWordValue };
        let loginRes = await loginKP(params);
        let { code, msg, data } = loginRes;
        if (code === 0) {
            //将token存储到sessionStorage中
            sessionStorage.setItem('token', data);
            //提示
            message.success('登录成功');
            //调用用户信息接口
            let userRes = await userKP();
            console.log(userRes);
            if (userRes.code === 0) {
                let { data } = userRes;
                let { userName } = data;
                //将数据存储到sessionStorage
                sessionStorage.setItem('userName', userName);
                //向redux的reducer分发任务
                store.dispatch(getAccount(userName));
                //跳转操作
                this.props.history.push({
                    pathname: '/home/apply'
                });
            };
        } else if (code === 9) {
            //提示
            message.error(msg);
        };
    };

    //清空数据
    getInputClear = (inpVal) => {

    };
    
    render () {
        return (
            <div>
                <div className="LoginStyle">
                    <div className="LoginStyleContent">
                        <div className="LoginStyleContentTitle">
                            {/* logo */}
                            <div className="item">
                                <img width={60} src={logo} alt="" />
                            </div>
                            {/* 名称 */}
                            <div className="item">
                                快盘科技
                            </div>
                        </div>
                        <div className="LoginStyleContentItem">
                            {/* 用户名 */}
                            <X86Input inputSize={this.inputSize} inpPlaceholder={this.userPlaceholder} inpPrefix={this.userPreFix} getInputValue={this.getUserNameValue} getInputClear={this.getInputClear}></X86Input>
                        </div>
                        <div className="LoginStyleContentItem">
                            {/* 密码 */}
                            <Password size={this.inputSize} placeholder={this.passwordPlaceholder} prefix={this.passwordPreFix} onChange={this.getPassWordValue}></Password>
                        </div>
                        <div>
                            <X86Button blockBtn={this.blockBtn} applyButtonType={this.applyButtonType} applyButtonText={this.applyButtonLogin} getBtnValue={this.getBtnLogin}></X86Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
