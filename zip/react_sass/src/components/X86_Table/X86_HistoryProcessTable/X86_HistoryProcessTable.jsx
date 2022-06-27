import React, { Component } from 'react';
import { Table } from 'antd';

export default class X86_CloudTable extends Component {
    tableSize = 'middle';

    columns = [
        {
            title: '进程id',
            dataIndex: 'processId',
            key: 'processId',
            align: 'center'
        },
        // {
        //     title: 'sessionToken',
        //     dataIndex: 'sessionToken',
        //     key: 'sessionToken',
        //     align: 'center',
        //     render: (text) => {
        //         return (
        //             <div style={{width: 80}}>{text}</div>
        //         );
        //     }
        // },
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
            align: 'center'
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
        }
    ];

    changePage = (current) => {
        this.props.processChangePage(current);
    };

    async componentDidMount () {
        
    };

    render () {
        let { tableData, pageSize, total } = this.props;

        const paginationProps = {
            pageSize: pageSize,
            total: total,  //数据的总的条数
            showSizeChanger: false,
            onChange: (current) => this.changePage(current)
        };

        return (
            <div>
                <Table bordered={true} size={this.tableSize} columns={this.columns} dataSource={tableData} pagination={paginationProps}/>
            </div>
        );
    };
};
