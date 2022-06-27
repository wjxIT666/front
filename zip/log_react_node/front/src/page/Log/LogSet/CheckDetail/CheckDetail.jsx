import React, { Component } from 'react';
import './CheckDetail.less';
import LogButton from '../../../../components/Log_Button/Log_Button.jsx';
import CheckDetailModal from '../../../../components/Log_Modal/Log_SetModal/CheckDetail/CheckDetailModal.jsx';
import CheckDetailTable from '../../../../components/Log_Table/Log_SetTable/CheckDetail/CheckDetailTable.jsx';
import { checkDetailQuery, checkDetailDelete } from '../../../../request/api.js';
import { message } from 'antd';
import CheckDetailUpdateModal from '../../../../components/Log_Modal/Log_SetModal/CheckDetail/CheckDetailUpdateModal.jsx';

export default class CheckDetail extends Component {
    state = {
        btnType: 'primary',
        btnText: '添加条目',
        btnBlock: false,
        modalTitle: '添加条目',
        isModalVisible: false,
        okText: '确认',
        cancelText: '取消',
        current: 1,
        pageSize: 10,
        tableData: [],
        total: 0,
        modalUpdateTitle: '修改条目',
        isModalUpdateVisible: false,
        okUpdateText: '确认',
        cancelUpdateText: '取消',
        editRecord: null
    };
    //添加条目
    getBtnClick = () => {
        this.setState({
            isModalVisible: true
        });
    };
    //取消弹窗
    handleCancel = (val) => {
        this.setState({
            isModalVisible: val
        });
    };
    //确认弹窗
    handleOk = async (val) => {
        //获取列表接口
        let { current, pageSize } = this.state;
        let data = { current, pageSize, id: this.props.location.state.id };
        let checkDetailQueryRes = await checkDetailQuery(data);
        let { code, total } = checkDetailQueryRes;
        if ( code === 0 ) {
            if (total === 0) {
                this.setState({
                    tableData: [],
                    total: 0
                });
            } else {
                this.setState({
                    tableData: [...checkDetailQueryRes.data.list],
                    total: total
                });
                this.setState({
                    isModalVisible: val
                });
            };
        };
    };
    //初始化
    async componentDidMount () {
        //获取列表接口
        let { current, pageSize } = this.state;
        let data = { current, pageSize, id: this.props.location.state.id };
        let checkDetailQueryRes = await checkDetailQuery(data);
        let { code, total } = checkDetailQueryRes;
        if ( code === 0 ) {
            if (total === 0) {
                this.setState({
                    tableData: [],
                    total: 0
                });
            } else {
                this.setState({
                    tableData: [...checkDetailQueryRes.data.list],
                    total: total
                });
            };
        };
    };
    //分页
    checkDetailChangePage = async (val) => {
        this.setState({
            current: val
        });
        //获取列表接口
        let { pageSize } = this.state;
        let data = { current: val, pageSize, id: this.props.location.state.id };
        let checkDetailQueryRes = await checkDetailQuery(data);
        let { code, total } = checkDetailQueryRes;
        if ( code === 0 ) {
            if (total === 0) {
                this.setState({
                    tableData: [],
                    total: 0
                });
            } else {
                this.setState({
                    tableData: [...checkDetailQueryRes.data.list],
                    total: total
                });
            };
        };
    };
    //删除
    getDelete = async (record) => {
        let { key } = record;
        let data = { key, id: this.props.location.state.id };
        let checkDetailDeleteRes = await checkDetailDelete(data);
        if (checkDetailDeleteRes.code === 0) {
            //获取列表接口
            let { current, pageSize } = this.state;
            let data = { current, pageSize, id: this.props.location.state.id };
            let checkDetailQueryRes = await checkDetailQuery(data);
            let { code, total } = checkDetailQueryRes;
            if ( code === 0 ) {
                if (total === 0) {
                    this.setState({
                        tableData: [],
                        total: 0
                    });
                } else {
                    this.setState({
                        tableData: [...checkDetailQueryRes.data.list],
                        total: total
                    });
                };
                message.success(checkDetailDeleteRes.msg);
            };
        };
    };
    //修改
    getUpdate = (record) => {
        this.setState({
            isModalUpdateVisible: true,
            editRecord: record
        });
    };
    //确认修改弹窗
    handleUpdateOk = async (val) => {
        //获取列表接口
        let { current, pageSize } = this.state;
        let data = { current, pageSize, id: this.props.location.state.id };
        let checkDetailQueryRes = await checkDetailQuery(data);
        let { code, total } = checkDetailQueryRes;
        if ( code === 0 ) {
            if (total === 0) {
                this.setState({
                    tableData: [],
                    total: 0
                });
            } else {
                this.setState({
                    tableData: [...checkDetailQueryRes.data.list],
                    total: total
                });
            };
        };
        this.setState({
            isModalUpdateVisible: val
        });
    };
    //取消修改弹窗
    handleUpdateCancel = (val) => {
        this.setState({
            isModalUpdateVisible: val
        });
    };
    render () {
        let { btnType, btnText, btnBlock, modalTitle, isModalVisible, okText, cancelText, tableData, pageSize, total, modalUpdateTitle, isModalUpdateVisible, okUpdateText, cancelUpdateText, editRecord } = this.state;
        let id = this.props.location.state.id;
        return (
            <div className="CheckDetailStyle">
                {/* 添加条目 */}
                <div className="CheckDetailProject">
                    {/* 添加条目按钮 */}
                    <LogButton {...{btnType, btnText, btnBlock}} getBtnClick={this.getBtnClick}></LogButton>
                    {/* 添加条目弹窗 */}
                    <CheckDetailModal {...{modalTitle, isModalVisible, okText, cancelText, id}} handleCancel={this.handleCancel} handleOk={this.handleOk}></CheckDetailModal>
                </div>
                {/* 项目列表 */}
                <div className="CheckDetailTable">
                    <CheckDetailTable {...{tableData, pageSize, total}} checkDetailChangePage={this.checkDetailChangePage} getDelete={this.getDelete} getUpdate={this.getUpdate}></CheckDetailTable>
                    {/* 修改弹窗展示 */}
                    <CheckDetailUpdateModal modalTitle={modalUpdateTitle} isModalVisible={isModalUpdateVisible} okText={okUpdateText} handleUpdateOk={this.handleUpdateOk} cancelText={cancelUpdateText} handleUpdateCancel={this.handleUpdateCancel} editRecord={editRecord} id={id}></CheckDetailUpdateModal>
                </div>
            </div>
        );
    };
};
