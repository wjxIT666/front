import React, { Component } from 'react';
import { Table } from 'antd';

export default class Log_SetTable extends Component {
    //分页
    changePage = (value) => {
        this.props.roleChangePage(value);
    };
    render() {
        const columns = [
            {
                title: '角色id',
                dataIndex: 'code',
                key: 'code',
                align: 'center'
            },
            {
                title: '角色名称',
                dataIndex: 'name',
                key: 'name',
                align: 'center'
            }
        ];

        let { tableData, pageSize, total } = this.props;
        const paginationProps = {
            pageSize: pageSize,
            total: total,  //数据的总的条数
            showSizeChanger: false,
            onChange: (current) => this.changePage(current)
        };
        return (
            <div>
                <Table columns={columns} dataSource={tableData} pagination={paginationProps}/>
            </div>
        );
    };
};
