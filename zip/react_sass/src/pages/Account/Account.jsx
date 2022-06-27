import React, { Component } from 'react';
import './Account.less';
import Text from '../../components/Text/Text.jsx';
import X86Input from '../../components/X86_Input/X86_Input.jsx';
import X86Button from '../../components/X86_Button/X86_Button.jsx';
import store from '../../redux/store.js';
import { Input, message, Popover } from 'antd';
import { userKP, resetPwdKP } from '../../request/api.js';
import { isEmpty, rePwd } from '../../js/rules.js';
import menuList from '../../router/router.js';
import { exitLoginKP } from '../../request/api.js';
const { Password } = Input;

export default class Account extends Component {
    AccountInfo = '账号信息';
    AccountName = '账号';
    CloundCount = '设备数量';
    AccountEdit = '设置密码';
    OldPwd = '旧密码';
    NewPwd = '新密码';
    ReNewPwd = '确认新密码';
    applyButtonType = 'primary';
    applyButtonSave = '保存';
    inputSize = 'middle';
    inpDisabled = true;
    applyButtonExit = '退出登录';
    state = {
        oldPassword: '',
        password: '',
        rePassword: ''
    };
    //保存密码
    savePwd = async () => {
        let userRes = await userKP();
        let { code, data } = userRes;
        if (code === 0) {
            //获取userId
            let { userId } = data;
            //校验旧密码、新密码、二次密码
            let { oldPassword, password, rePassword } = this.state;
            let isEmptyOPError = isEmpty(oldPassword, '旧密码不能为空');
            let isEmptyPError = isEmpty(password, '新密码不能为空');
            let isEmptyRPError = isEmpty(rePassword, '二次密码不能为空');
            let checkPwd = rePwd(password, rePassword, '两次密码输入不一致');
            if (!isEmptyOPError || !isEmptyPError || !isEmptyRPError || !checkPwd) return false;
            //调用修改密码接口
            let params = { userId, oldPassword, password };
            let resetPwdRes = await resetPwdKP(params);
            if (resetPwdRes.code === 0) {
                message.success('密码修改成功');
            } else if (resetPwdRes.code === 9) {
                message.error(resetPwdRes.msg);
            };
        };
    };
    //旧密码赋值
    changeOldPassword = (e) => {
        this.setState({
            oldPassword: e.target.value
        });
    };
    //新密码赋值
    changePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };
    //二次密码确认
    changeRePassword = (e) => {
        this.setState({
            rePassword: e.target.value
        });
    };
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
        let inpVal = store.getState();
        return (
            <div>
                {/* 面包屑 */}
                <div className="X86_AccountBreadcrumbStyle">
                    {/* 账号信息 */}
                    <div className="X86_AccountBreadcrumbAccount">
                        <Popover content={content} trigger="hover">
                            <span>{userName}</span>
                        </Popover>
                    </div>
                    {/* 面包屑 */}
                    <div>
                        { BreadcrumbName }
                    </div>
                </div>
                <div className="AccountStyle">
                    {/* 账号信息 */}
                    <div className="AccountInfo">
                        {/* 账号信息 */}
                        <div className="AccountInfoText">
                            <Text TextContent={this.AccountInfo}></Text>
                        </div>
                        {/* 账号、设备数量 */}
                        <div className="AccountInfoContent">
                            {/* 账号 */}
                            <div className="AccountInfoContentItem">
                                <span className="AccountInfoContentItemSpan"><Text TextContent={this.AccountName}></Text></span>
                                <X86Input inputSize={this.inputSize} inpDisabled={this.inpDisabled} inpVal={inpVal}></X86Input>
                            </div>
                            {/* 设备数量 */}
                            {/* <div className="AccountInfoContentItem">
                                <span className="AccountInfoContentItemSpan"><Text TextContent={this.CloundCount}></Text></span>
                                <X86Input inputSize={this.inputSize} inpDisabled={this.inpDisabled}></X86Input>
                            </div> */}
                        </div>
                    </div>
                    {/* 设置密码 */}
                    <div className="AccountEdit">
                        {/* 设置密码 */}
                        <div className="AccountEditText">
                            <Text TextContent={this.AccountEdit}></Text>
                        </div>
                        {/* 表单 */}
                        <div className="AccountForm">
                            {/* 旧密码 */}
                            <div className="AccountFormItem">
                                <span className="AccountFormItemSpan"><Text TextContent={this.OldPwd}></Text></span>
                                <Password size={this.inputSize} onChange={this.changeOldPassword}></Password>
                            </div>
                            {/* 新密码 */}
                            <div className="AccountFormItem">
                                <span className="AccountFormItemSpan"><Text TextContent={this.NewPwd}></Text></span>
                                <Password size={this.inputSize} onChange={this.changePassword}></Password>
                            </div>
                            {/* 确认新密码 */}
                            <div className="AccountFormItem">
                                <span className="AccountFormItemSpan"><Text TextContent={this.ReNewPwd}></Text></span>
                                <Password size={this.inputSize} onChange={this.changeRePassword}></Password>
                            </div>
                            {/* 保存 */}
                            <div className="AccountFormItem">
                                <div>
                                    <X86Button applyButtonType={this.applyButtonType} applyButtonText={this.applyButtonSave} getBtnValue={this.savePwd}></X86Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};
