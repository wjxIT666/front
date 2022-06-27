import React, { Component } from 'react';
import { Table, Button } from 'antd';

export default class CheckDetailTable extends Component {
    //分页
    changePage = (value) => {
        this.props.checkDetailChangePage(value);
    };
    //删除
    delete = (record) => {
        this.props.getDelete(record);
    };
    //修改
    update = (record) => {
        this.props.getUpdate(record);
    };
    render () {
        const columns = [
            {
                title: '业务名称',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
                width: '100px',
                render: (text) => {
                    return (<div style={{width: '100px'}}>{text}</div>)
                }
            },
            {
                title: '服务地址',
                dataIndex: 'address',
                key: 'address',
                align: 'center',
                width: '150px',
                render: (text) => {
                    return (<div style={{width: '150px'}}>{text}</div>)
                }
            },
            {
                title: '服务域名',
                dataIndex: 'url',
                key: 'url',
                align: 'center',
                width: '150px',
                render: (text) => {
                    return (<div style={{width: '150px'}}>{text}</div>)
                }
            },
            {
                title: '服务端口',
                dataIndex: 'port',
                key: 'port',
                align: 'center'
            },
            {
                title: '目录',
                dataIndex: 'path',
                key: 'path',
                align: 'center',
                width: '200px',
                render: (text) => {
                    return (<div style={{width: '200px'}}>{text}</div>)
                }
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                width: '120px',
                render: (text, record) => {
                    return (<div style={{display: 'flex', justifyContent: 'space-around', width: '120px'}}>
                        <Button size="small" onClick={this.delete.bind(this, record)}>删除</Button>
                        <Button size="small" onClick={this.update.bind(this, record)}>修改</Button>
                    </div>)
                }
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
