import React, { Component } from 'react';
import './User.less';
import UserButton from '../../../components/Log_Button/Log_Button.jsx';
import UserModal from '../../../components/Log_Modal/UserModal/UserModal.jsx';
import { role, userTable, userDelete } from '../../../request/api.js';
import UserTable from '../../../components/Log_Table/UserTable/UserTable.jsx';
import { addKey, timeChange } from '../../../js/util.js';
import { Modal, message } from 'antd';
import UserUpdateModal from '../../../components/Log_Modal/UserModal/UserUpdateModal';

export default class User extends Component {
    state = {
        btnType: 'primary',
        btnText: '创建用户',
        btnBlock: false,
        SetModalTitle: '新增用户',
        SetModalVisible: false,
        roleList: [],
        roleDefault: '',
        tableData: [],
        current: 1,
        pageSize: 10,
        total: 0,
        isUserModalVisible: false,
        deleteRecord: null,
        updateRecord: null,
        SetUpdateModalTitle: '修改用户',
        SetUpdateModalVisible: false
    };
    //创建用户
    getBtnClick = () => {
        this.setState({
            SetModalVisible: true,
        });
    };
    //确认创建用户弹窗
    handleUserOk = async (val) => {
        //获取用户列表
        let { current, pageSize } = this.state;
        let userTableRes = await userTable({current, pageSize});
        if (userTableRes.code === 0) {
            userTableRes.userList.data.forEach( item => {
                //动态添加key
                addKey(item, item._id);
                //时间转换
                item.ctime = timeChange(item.ctime);
            } );
            this.setState({
                SetModalVisible: val,
                total: userTableRes.userList.total,
                tableData: [...userTableRes.userList.data]
            });
        };
    };
    //取消创建用户弹窗
    handleUserCancel = (val) => {
        this.setState({
            SetModalVisible: val
        });
    };
    //初始化
    async componentDidMount () {
        let roleRes = await role();
        let { code, data } = roleRes;
        if (code === 0) {
            this.setState({
                roleList: [...data],
                roleDefault: [...data][1].name
            });
        };

        //获取用户列表
        let { current, pageSize } = this.state;
        let userTableRes = await userTable({current, pageSize});
        if (userTableRes.code === 0) {
            userTableRes.userList.data.forEach( item => {
                //动态添加key
                addKey(item, item._id);
                //时间转换
                item.ctime = timeChange(item.ctime);
            } );
            this.setState({
                total: userTableRes.userList.total,
                tableData: [...userTableRes.userList.data]
            });
        };
    };
    //分页
    UserChangePage = async (val) => {
        this.setState({
            current: val
        });
        //获取用户列表
        let { pageSize } = this.state;
        let userTableRes = await userTable({current: val, pageSize});
        if (userTableRes.code === 0) {
            userTableRes.userList.data.forEach( item => {
                //动态添加key
                addKey(item, item._id);
                //时间转换
                item.ctime = timeChange(item.ctime);
            } );
            this.setState({
                total: userTableRes.userList.total,
                tableData: [...userTableRes.userList.data]
            });
        };
    };
    //删除
    userDelete = (record) => {
        this.setState({
            isUserModalVisible: true,
            deleteRecord: record
        });
    };
    //删除--确认
    handleUserDeleteOk = async () => {
        let { deleteRecord } = this.state;
        let { _id } = deleteRecord;
        let data = {id: _id};
        let userDeleteRes = await userDelete(data);
        let { code, msg } = userDeleteRes;
        if (code === 0) {
            message.success(msg);
            //获取用户列表
            let { current, pageSize } = this.state;
            let userTableRes = await userTable({current, pageSize});
            if (userTableRes.code === 0) {
                userTableRes.userList.data.forEach( item => {
                    //动态添加key
                    addKey(item, item._id);
                    //时间转换
                    item.ctime = timeChange(item.ctime);
                } );
                this.setState({
                    isUserModalVisible: false,
                    total: userTableRes.userList.total,
                    tableData: [...userTableRes.userList.data]
                });
            };
        }
    };
    //删除--取消
    handleUserDeleteCancel = () => {
        this.setState({
            isUserModalVisible: false
        });
    };
    //修改
    userUpdate = (record) => {
        this.setState({
            updateRecord: record,
            SetUpdateModalVisible: true
        });
    };
    //修改--确认
    handleUserUpdateOk = async (val) => {
        //获取用户列表
        let { current, pageSize } = this.state;
        let userTableRes = await userTable({current, pageSize});
        if (userTableRes.code === 0) {
            userTableRes.userList.data.forEach( item => {
                //动态添加key
                addKey(item, item._id);
                //时间转换
                item.ctime = timeChange(item.ctime);
            } );
            this.setState({
                SetUpdateModalVisible: val,
                total: userTableRes.userList.total,
                tableData: [...userTableRes.userList.data]
            });
        };
    };
    //修改--取消
    handleUserUpdateCancel = (val) => {
        this.setState({
            SetUpdateModalVisible: val
        });
    };
    render () {
        let { btnType, btnText, btnBlock, SetModalTitle, SetModalVisible, roleList, roleDefault, tableData, pageSize, total, isUserModalVisible, SetUpdateModalTitle, SetUpdateModalVisible, updateRecord } = this.state;
        return (
            <div className="UserStyle">
                {/* 创建用户 */}
                <div className="AddUser">
                    {/* 创建用户按钮 */}
                    <UserButton {...{btnType, btnText, btnBlock}} getBtnClick={this.getBtnClick}></UserButton>
                    {/* 创建用户弹窗 */}
                    <UserModal {...{SetModalTitle, SetModalVisible, roleList, roleDefault}} handleUserOk={this.handleUserOk} handleUserCancel={this.handleUserCancel}></UserModal>
                </div>
                {/* 用户列表 */}
                <div className="UserTable">
                    <UserTable {...{tableData, pageSize, total}} UserChangePage={this.UserChangePage} userDelete={this.userDelete} userUpdate={this.userUpdate}></UserTable>
                    {/* 删除弹窗 */}
                    <Modal title="删除用户" visible={isUserModalVisible} onOk={this.handleUserDeleteOk} okText="确认" onCancel={this.handleUserDeleteCancel} cancelText="取消">
                        确认删除吗？
                    </Modal>
                    {/* 修改弹窗 */}
                    <UserUpdateModal {...{updateRecord, roleList, roleDefault}} SetModalTitle={SetUpdateModalTitle} SetModalVisible={SetUpdateModalVisible} handleUserUpdateOk={this.handleUserUpdateOk} handleUserUpdateCancel={this.handleUserUpdateCancel}></UserUpdateModal>
                </div>
            </div>
        );
    };
};
