import React, { Component } from 'react';
import { Table, Space, Button } from 'antd';
import X86ApplyUpdateModal from '../../components/X86_Modal/X86_ApplyUpdateModal/X86_ApplyUpdateModal.jsx';
import X86ApplyBuildModal from '../../components/X86_Modal/X86_ApplyBuildModal/X86_ApplyBuildModal.jsx';
import X86ApplyBrowserModal from '../../components/X86_Modal/X86_ApplyBrowserModal/X86_ApplyBrowserModal.jsx';

export default class X86_Table extends Component {
    tableSize = 'middle';
    btnDisabled = false;

    columns = [
        {
            title: '应用id',
            dataIndex: 'appCode',
            key: 'appCode',
            align: 'center'
        },
        {
            title: '应用名称',
            dataIndex: 'appName',
            key: 'appName',
            align: 'center',
            width: '100px',
            render: (text) => {
                return (
                    <div style={{width: 100}}>{text}</div>
                )
            }
        },
        {
            title: '应用路径',
            dataIndex: 'path',
            key: 'path',
            align: 'center',
            width: '150px',
            render: (text) => {
                return (
                    <div style={{width: 150}}>{text}</div>
                )
            }
        },
        {
            title: '应用大小(MB)',
            dataIndex: 'size',
            key: 'size',
            align: 'center'
        },
        {
            title: '上传时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center',
            width: '100px',
            render: (text) => {
                return (
                    <div style={{width: 100}}>{text}</div>
                )
            }
        },
        {
            title: '并发数',
            dataIndex: 'concurrency',
            key: 'concurrency',
            align: 'center',
            width: '50px',
            render: (text) => {
                return (
                    <div style={{width: 50}}>{text}</div>
                )
            }
        },
        {
            title: '区域机房',
            dataIndex: 'regions',
            key: 'regions',
            align: 'center',
            width: '100px',
            render: (text) => {
                return (
                    <div style={{width: 100}}>{text}</div>
                )
            }
        },
        {
            title: '状态',
            dataIndex: 'publish',
            key: 'publish',
            align: 'center',
            width: '50px',
            render: (text) => {
                return (
                    <div style={{width: 50}}>{text}</div>
                )
            }
        },
        
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <Button size="small" disabled={record.flag !== 1 ? record.versionInfo.publish === '发布中' ? true : this.btnDisabled : this.btnDisabled} onClick={this.applyUpdate.bind(this, record)}>更新版本</Button>
                        {
                            this.ApplyOperate(record)
                        }
                    </Space>
                )
            }
        }
    ];

    state = {
        record: null,
        appCode: '',
        modalUpdateText: '更新应用',
        modalUpdateVisible: false,
        modalUpdateOkText: '确认',
        modalUpdateCancelText: '取消',
        modalBuildText: '提示',
        modalBuildVisible: false,
        modalBuildOkText: '确认',
        modalBuildCancelText: '取消',
        modalBrowserText: '浏览器启动',
        modalBrowserVisible: false,
        modalBrowserOkText: '确认',
        modalBrowserCancelText: '取消',
        applyStartRecord: null
    };

    changePage = (value) => {
        this.props.applyChangePage(value);
    };

    applyUpdate = (record) => {
        this.setState({
            modalUpdateVisible: true
        });
        let { appCode } = record;
        console.log(appCode, 'appCode');
        this.setState({
            appCode
        });
    };

    //分发应用--调起浏览器启动弹窗
    applyBuild = (record) => {
        this.setState({
            modalBuildVisible: true,
            record
        });
    };

    applyStart = (record) => {
        this.setState({
            modalBrowserVisible: true,
            applyStartRecord: record
        });
    };

    modalUpdateCancel = (flag) => {
        this.setState({
            modalUpdateVisible: flag
        });
    };

    modalUpdateOk = (flag) => {
        this.setState({
            modalUpdateVisible: flag
        });
    };

    gameApplySuucess = () => {
        this.props.gameUpdateApplySuucess();
    };

    modalBuildCancel = (flag) => {
        this.setState({
            modalBuildVisible: flag
        });
    };

    //浏览器启动--关闭触发
    modalBrowserCancel = (flag) => {
        this.setState({
            modalBrowserVisible: flag
        });
    };

    //浏览器启动--确认关闭
    modalBrowserOk = (flag) => {
        this.setState({
            modalBrowserVisible: flag
        });
    };

    //浏览器启动--确认触发
    browserApplySuucess = (value) => {
        let { applyStartRecord } = this.state;
        this.props.applyStart(applyStartRecord, value);
    };

    modalBuildOk = (flag) => {
        let { record } = this.state;
        this.props.getModalBuildOk(record);
        this.setState({
            modalBuildVisible: flag
        });
    };

    ApplyOperate = (record) => {
        if (record.flag !== 1) {
            if (record.versionInfo.publish === '已发布') {
                return (
                    <Button size="small" onClick={this.applyStart.bind(this, record)}>浏览器启动</Button>
                );
            } else if (record.versionInfo.publish === '待发布') {
                return (
                    <Button size="small" disabled={this.btnDisabled} onClick={this.applyBuild.bind(this, record)}>分发应用</Button>
                );
            };
        } else if (record.flag === 1) {
            return (
                <Button size="small" onClick={this.applyStart.bind(this, record)}>浏览器启动</Button>
            );
        };
    };

    componentDidMount () {
        
    };

    render () {
        let { appCode, modalUpdateText, modalUpdateVisible, modalUpdateOkText, modalUpdateCancelText, modalBuildText, modalBuildVisible, modalBuildOkText, modalBuildCancelText, modalBrowserText, modalBrowserVisible, modalBrowserOkText, modalBrowserCancelText, applyStartRecord } = this.state;
        let { tableData, pageSize, total, btnDisabled } = this.props;

        this.btnDisabled = btnDisabled;
        const paginationProps = {
            pageSize: pageSize,
            total: total,  //数据的总的条数
            showSizeChanger: false,
            onChange: (current) => this.changePage(current)
        };
        return (
            <div>
                <Table bordered={true} size={this.tableSize} columns={this.columns} dataSource={tableData} pagination={paginationProps}/>
                {/* 弹窗---更新应用 */}
                <X86ApplyUpdateModal {...{appCode, modalUpdateText, modalUpdateVisible, modalUpdateOkText, modalUpdateCancelText}} modalUpdateCancel={this.modalUpdateCancel} modalUpdateOk={this.modalUpdateOk} gameApplySuucess={this.gameApplySuucess}></X86ApplyUpdateModal>
                {/* 弹窗---分发应用 */}
                <X86ApplyBuildModal {...{modalBuildText, modalBuildVisible, modalBuildOkText, modalBuildCancelText}} modalCancel={this.modalBuildCancel} modalOk={this.modalBuildOk}></X86ApplyBuildModal>
                {/* 弹窗---浏览器启动 */}
                <X86ApplyBrowserModal {...{applyStartRecord, modalBrowserText, modalBrowserVisible, modalBrowserOkText, modalBrowserCancelText}} modalBrowserCancel={this.modalBrowserCancel} modalBrowserOk={this.modalBrowserOk} browserApplySuucess={this.browserApplySuucess}></X86ApplyBrowserModal>
            </div>
        );
    };
};
