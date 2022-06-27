import React, { Component } from 'react';
import { Table, Space, Button } from 'antd';

export default class X86_CloudTable extends Component {
    tableSize = 'middle';

    columns = [
        {
            title: '进程id',
            dataIndex: 'processId',
            key: 'processId',
            align: 'center',
            render: (text) => {
                return (
                    <div style={{width: 80}}>{text}</div>
                )
            }
        },
        {
            title: 'sessionToken',
            dataIndex: 'sessionToken',
            key: 'sessionToken',
            align: 'center',
            render: (text) => {
                return (
                    <div style={{width: 80}}>{text}</div>
                );
            }
        },
        {
            title: 'ip',
            dataIndex: 'ip',
            key: 'ip',
            align: 'center'
        },
        {
            title: '应用名称',
            dataIndex: 'appName',
            key: 'appName',
            align: 'center',
            render: (text) => {
                return (
                    <div style={{ width: 80 }}>{text}</div>
                )
            }
        },
        {
            title: '设备状态',
            dataIndex: 'appStatus',
            key: 'appStatus',
            align: 'center'
        },
        {
            title: '使用状态',
            dataIndex: 'sessionStatus',
            key: 'sessionStatus',
            align: 'center'
        },
        {
            title: '开始时间',
            dataIndex: 'startTime',
            key: 'startTime',
            align: 'center'
        },
        {
            title: '历时',
            dataIndex: 'duration',
            key: 'duration',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <Button size="small" onClick={this.processStop.bind(this, record)}>中止</Button>
                        <Button size="small" disabled={record.appStatus !== 'RUNNING' || record.sessionStatus !== '空闲'} onClick={this.processConnect.bind(this, record)}>直连</Button>
                    </Space>
                )
            }
        }
    ];

    state = {
        selectedRowKeys: []
    };

    changePage = (current) => {
        this.props.processChangePage(current);
    };

    onSelectChange = (selectedRowKeys, item) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys, item);
        this.setState({ selectedRowKeys });
        this.props.getselectedRowKeys(selectedRowKeys);
    };

    async componentDidMount () {
        
    };

    //直连
    processConnect = (record) => {
        console.log(record);
        this.props.getProcessConect(record);
    };

    //中止
    processStop = (record) => {
        this.props.getProcessStop(record);
    };

    render () {
        let { selectedRowKeys } = this.state;
        let { tableData, pageSize, total } = this.props;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const paginationProps = {
            pageSize: pageSize,
            total: total,  //数据的总的条数
            showSizeChanger: false,
            onChange: (current) => this.changePage(current)
        };

        return (
            <div>
                <Table bordered={true} rowSelection={rowSelection} size={this.tableSize} columns={this.columns} dataSource={tableData} pagination={paginationProps}/>
            </div>
        );
    };
};
