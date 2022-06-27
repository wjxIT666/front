import React, { Component } from 'react';
import './Role.less';
import RoleTable from '../../../components/Log_Table/RoleTable/RoleTable.jsx';
import { roleTable } from '../../../request/api.js';
import { addKey } from '../../../js/util.js';

export default class Role extends Component {
    state = {
        tableData: [],
        current: 1,
        pageSize: 10,
        total: 0
    };
    //初始化
    async componentDidMount () {
        let { current, pageSize } = this.state;
        let roleTableRes = await roleTable({ current, pageSize });
        let { code, data } = roleTableRes;
        if ( code === 0 ) {
            data['data'].forEach( item => {
                //动态添加key
                addKey(item, item._id);
            } );
            this.setState({
                total: data['total'],
                tableData: data['data']
            });
        };
    };
    //分页
    roleChangePage = async (val) => {
        this.setState({
            current: val
        });

        let { pageSize } = this.state;
        let roleTableRes = await roleTable({ current: val, pageSize });
        let { code, data } = roleTableRes;
        if ( code === 0 ) {
            data['data'].forEach( item => {
                //动态添加key
                addKey(item, item._id);
            } );
            this.setState({
                total: data['total'],
                tableData: data['data']
            });
        };

    };
    render () {
        let { tableData, pageSize, total } = this.state;
        return (
            <div className="RoleStyle">
                {/* 角色列表 */}
                <div className="RoleTable">
                    <RoleTable {...{tableData, pageSize, total}} roleChangePage={this.roleChangePage}></RoleTable>
                </div>
            </div>
        );
    };
};
