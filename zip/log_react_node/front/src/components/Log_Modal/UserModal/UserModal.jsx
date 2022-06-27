import React, { Component } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import LogDrawer from '../../Log_Drawer/Log_Drawer.jsx';
import { userAdd } from '../../../request/api.js';
import { isEmpty } from '../../../js/util.js';
const { Item } = Form;
const { Option } = Select;
const { Password } = Input;

export default class UserModal extends Component {
    refForm = React.createRef();
    state = {
        name: '',
        password: '',
        drawerTitle: '权限列表',
        placement: 'right',
        visible: false,
        treeArr: [],
        roleListValue: ''
    };
    //用户名称
    nameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    };
    //用户密码
    passwordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    };
    //确认
    handleOk = async () => {
        let { name, password, roleListValue, treeArr } = this.state;
        let { roleDefault } = this.props;
        //非空校验
        let nameRule = isEmpty(name, '请填写用户名称');
        let pwdRule = isEmpty(password, '请填写用户密码');
        if (!nameRule || !pwdRule) return false;
        let data = { u_name: name, u_password: password, roleListValue: roleListValue === '' ? roleDefault: roleListValue , treeArr, grantor: sessionStorage.getItem('u_name') };
        let userAddRes = await userAdd(data);
        let { code, msg } = userAddRes;
        if (code === 0) {
            message.success(msg);
            //清空表单数据
            let { roleDefault } = this.props;
            this.refForm.current.setFieldsValue({
                roleDefault
            });
            this.setState({
                name: '',
                password: '',
                roleListValue: ''
            });
            this.props.handleUserOk(false);
        } else if (code === 9) {
            message.error(msg);
        };
    };
    //取消
    handleCancel = () => {
        this.props.handleUserCancel(false);
        //清空表单数据
        let { roleDefault } = this.props;
        this.refForm.current.setFieldsValue({
            roleDefault
        });
        this.setState({
            name: '',
            password: '',
            roleListValue: ''
        });
    };
    //角色变化触发
    roleChange = (value, item) => {
        this.setState({
            roleListValue: item.key
        });
    };
    //配置权限
    userConfig = () => {
        this.setState({
            visible: true
        });
    };
    //配置权限关闭
    drawerClose = (val) => {
        this.setState({
            visible: val
        });
    };
    //树结构
    treeCheck = (arr) => {
        this.setState({
            treeArr: arr
        });
    };
    render () {
        let { name, password, drawerTitle, placement, visible, treeArr } = this.state;
        let { SetModalTitle, SetModalVisible, roleList, roleDefault } = this.props;
        let roleCode = sessionStorage.getItem('roleCode');
        return (
            <div>
                <Modal title={SetModalTitle} visible={SetModalVisible} onOk={this.handleOk} okText="确认" onCancel={this.handleCancel} cancelText="取消">
                    {/* 表单 */}
                    <Form labelCol={{ span: 4 }} ref={this.refForm} initialValues={{ roleDefault }}>
                        {/* 用户名称 */}
                        <Item label="用户名称">
                            <Input value={name} placeholder="请输入用户名称" onChange={this.nameChange}></Input>
                        </Item>
                        {/* 用户密码 */}
                        <Item label="用户密码">
                            <Password value={password} placeholder="请输入用户密码" onChange={this.passwordChange}></Password>
                        </Item>
                        {/* 角色 */}
                        <Item label="角色" name="roleDefault">
                            <Select placeholder="请选择角色" onChange={this.roleChange}>
                                {
                                    roleList.map( item => {
                                        return (<Option key={item.code} value={item.name} disabled={item.name === '管理员' && roleCode !== '99'}></Option>)
                                    } )
                                }
                            </Select>
                        </Item>
                        {/* 配置权限 */}
                        <Item label="配置权限">
                            <Button onClick={this.userConfig}>配置</Button>
                            {/* 权限列表抽屉 */}
                            <LogDrawer {...{drawerTitle, placement, visible, treeArr}} drawerClose={this.drawerClose} treeCheck={this.treeCheck}></LogDrawer>
                        </Item>
                    </Form>
                </Modal>
            </div>
        );
    };
};
