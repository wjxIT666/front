import React, { Component } from 'react';
import { Table, Button } from 'antd';

export default class UserTable extends Component {
    //分页
    changePage = (value) => {
        this.props.UserChangePage(value);
    };
    //删除
    delete = (record) => {
        this.props.userDelete(record);
    };
    //修改
    update = (record) => {
        this.props.userUpdate(record);
    };
    render() {
        let roleCode = sessionStorage.getItem('roleCode');
        const columns = [
            {
                title: 'id',
                dataIndex: '_id',
                key: '_id',
                align: 'center',
                render: (text) => {
                    return (
                        <div>{text.substring(0, 8)}</div>
                    )
                }
            },
            {
                title: '用户名',
                dataIndex: 'u_name',
                key: 'u_name',
                align: 'center'
            },
            {
                title: '角色id',
                dataIndex: 'roleCode',
                key: 'roleCode',
                align: 'center'
            },
            {
                title: '角色',
                dataIndex: 'roleName',
                key: 'roleName',
                align: 'center'
            },
            {
                title: '注册时间',
                dataIndex: 'ctime',
                key: 'ctime',
                align: 'center'
            },
            {
                title: '授权人',
                dataIndex: 'grantor',
                key: 'grantor',
                align: 'center'
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                width: '120px',
                render: (text, record) => (
                    <div style={{width: '120px', display: 'flex', justifyContent: 'space-around'}}>
                        <Button size="small" onClick={this.delete.bind(this, record)} disabled={ record.roleCode === '99' && roleCode === '0' }>删除</Button>
                        <Button size="small" onClick={this.update.bind(this, record)} disabled={ record.roleCode === '99' && roleCode === '0' }>修改</Button>
                    </div>
                )
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
