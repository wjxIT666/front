import React, { Component } from 'react';
import { Table } from 'antd';

export default class X86_CloudTable extends Component {
    tableSize = 'middle';

    columns = [
        {
            title: '设备id',
            dataIndex: 'instanceId',
            key: 'instanceId',
            align: 'center'
        },
        {
            title: 'ip',
            dataIndex: 'ip',
            key: 'ip',
            align: 'center'
        },
        {
            title: '设备算力',
            dataIndex: 'configGpu',
            key: 'configGpu',
            align: 'center'
        },
        {
            title: '设备状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            align: 'center'
        }
    ];

    state = {
        selectedRowKeys: []
    };

    changePage = (current) => {
        this.props.cloudChangePage(current);
    };

    onSelectChange = (selectedRowKeys, item) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys, item);
        this.setState({ selectedRowKeys });
        this.props.getselectedRowKeys(selectedRowKeys);
    };

    componentDidMount () {
       
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
