import React, { Component } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import LogDrawer from '../../Log_Drawer/Log_Drawer';
import { userEdit } from '../../../request/api.js';
const { Item } = Form;
const { Password } = Input;
const { Option } = Select;

export default class UserUpdateModal extends Component {
    refForm = React.createRef();
    state = {
        updatePwd: '',
        roleListValue: '',
        drawerTitle: '权限列表',
        placement: 'right',
        visible: false,
        treeArr: []
    };
    //确认
    handleOk = async () => {
        let { updatePwd, roleListValue, treeArr } = this.state;
        let { roleDefault, updateRecord } = this.props;
        let { u_name } = updateRecord;
        let data = { u_name, u_password: updatePwd, roleListValue: roleListValue === '' ? roleDefault: roleListValue, treeArr };
        let userEditRes = await userEdit(data);
        let { code, msg } = userEditRes;
        if ( code === 0 ) {
            message.success(msg);
            //清空表单数据
            let { roleDefault } = this.props;
            this.refForm.current.setFieldsValue({
                roleDefault
            });
            this.setState({
                updatePwd: '',
                roleListValue: ''
            });
            this.props.handleUserUpdateOk(false);
        };
    };
    //取消
    handleCancel = () => {
        this.props.handleUserUpdateCancel(false);
        //清空表单数据
        let { roleDefault } = this.props;
        this.refForm.current.setFieldsValue({
            roleDefault
        });
        this.setState({
            updatePwd: '',
            roleListValue: ''
        });
    };
    //修改密码
    updatePwd = (e) => {
        this.setState({
            updatePwd: e.target.value
        });
    };
    //修改角色
    selectChange = (value, item) => {
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
        let { SetModalTitle, SetModalVisible, updateRecord, roleList, roleDefault } = this.props;
        console.log(updateRecord);
        let _id, u_name, roleName;
        if (updateRecord !== null) {
            _id = updateRecord._id;
            _id = _id.substring(0, 8);
            u_name = updateRecord.u_name;
            roleName = updateRecord.roleName;
        };
        let { updatePwd, drawerTitle, placement, visible, treeArr } = this.state;
        let roleCode = sessionStorage.getItem('roleCode');
        return (
            <div>
                <Modal title={SetModalTitle} visible={SetModalVisible} onOk={this.handleOk} okText="确认" onCancel={this.handleCancel} cancelText="取消">
                    {/* 表单 */}
                    <Form labelCol={{ span: 4 }} ref={this.refForm} initialValues={{ roleDefault }}>
                        {/* 用户id */}
                        <Item label="id">
                            <Input value={_id} disabled={true}></Input>
                        </Item>
                        {/* 用户名称 */}
                        <Item label="用户名称">
                            <Input value={u_name} disabled={true}></Input>
                        </Item>
                        {/* 所属角色 */}
                        <Item label="所属角色">
                            <Input value={roleName} disabled={true}></Input>
                        </Item>
                        {/* 更新密码 */}
                        <Item label="更新密码">
                            <Password value={updatePwd} placeholder='请修改密码' onChange={this.updatePwd}></Password>
                        </Item>
                        {/* 更换角色 */}
                        <Item label="更换角色" name="roleDefault">
                            <Select placeholder="请更换角色" onChange={this.selectChange}>
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
