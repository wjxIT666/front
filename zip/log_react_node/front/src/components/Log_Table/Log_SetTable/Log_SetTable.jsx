import React, { Component } from 'react';
import { Table, Tag, Button } from 'antd';


export default class Log_SetTable extends Component {
    //分页
    changePage = (value) => {
        this.props.logSetChangePage(value);
    };
    //查看
    check = (record) => {
        this.props.getCheck(record);
    };
    render() {
        const columns = [
            {
                title: '项目名称',
                dataIndex: 'projName',
                key: 'projName',
                align: 'center'
            },
            {
                title: '标签',
                key: 'tags',
                dataIndex: 'tags',
                align: 'center',
                render: tags => (
                    <>
                        {tags.map(tag => {
                            let color = tag.length > 5 ? 'geekblue' : 'green';
                            return (
                                <Tag color={color} key={tag}>
                                    {tag}
                                </Tag>
                            );
                        })}
                    </>
                ),
            },
            {
                title: '创建时间',
                dataIndex: 'ctime',
                key: 'ctime',
                align: 'center'
            },
            {
                title: '创建人',
                dataIndex: 'cuser',
                key: 'cuser',
                align: 'center'
            },
            {
                title: '操作',
                key: 'action',
                align: 'center',
                render: (text, record) => (
                    <div>
                        <Button type="primary" size="small" onClick={this.check.bind(this, record)}>查看</Button>
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
