import React, { Component } from 'react';
import './LogSet.less';
import LogButton from '../../../components/Log_Button/Log_Button.jsx';
import LogSetModal from '../../../components/Log_Modal/Log_SetModal/Log_SetModal.jsx';
import LogInput from '../../../components/Log_Input/Log_Input.jsx';
import LogSetTable from '../../../components/Log_Table/Log_SetTable/Log_SetTable.jsx';
import { logSetTable } from '../../../request/api.js';
import { addKey, timeChange } from '../../../js/util.js';
import LogDatePicker from '../../../components/Log_DatePicker/Log_DatePicker.jsx';

export default class Log_Set extends Component {
    state = {
        btnType: 'primary',
        btnText: '创建项目',
        btnBlock: false,
        SetModalTitle: '创建项目',
        SetModalVisible: false,
        btnSearchType: 'primary',
        btnSearchText: '搜索',
        btnSearchBlock: false,
        current: 1,
        pageSize: 10,
        tableData: [],
        total: 0,
        projNameVal: '',
        userVal: '',
        startTime: '',
        endTime: ''
    };
    //创建项目
    getBtnClick = () => {
        this.setState({
            SetModalVisible: true
        });
    };
    //确认弹窗
    getSetOk = async (val) => {
        //获取日志配置列表
        let { current, pageSize } = this.state;
        let data = { current, pageSize };
        let logSetTableRes = await logSetTable(data);
        if (logSetTableRes.code === 0) {
            logSetTableRes.data.forEach( item => {
                //动态添加key
                addKey(item, item._id);
                //时间转换
                item.ctime = timeChange(item.ctime);
            } );
            this.setState({
                total: logSetTableRes.total,
                tableData: logSetTableRes.data,
                SetModalVisible: val
            });
        }
    };
    //取消弹窗
    getSetCancel = (val) => {
        this.setState({
            SetModalVisible: val
        });
    };
    //项目名称搜索
    getInpNameChange = (val) => {
        this.setState({
            projNameVal: val
        });
    };
    //创建时间搜索
    getDateTime = (date, dateString) => {
        console.log(date, dateString);
        this.setState({
            startTime: dateString[0] === '' ? '' : new Date(dateString[0]).valueOf(),
            endTime: dateString[1] === '' ? '' : new Date(dateString[1]).valueOf()
        });
    };
    //创建人搜索
    getInpUserChange = (val) => {
        this.setState({
            userVal: val
        });
    };
    //搜索
    getBtnSearch = async () => {
        //获取日志配置列表接口
        let { current, pageSize, projNameVal, userVal, startTime, endTime } = this.state;
        let data = { current, pageSize, projNameVal, userVal, startTime, endTime };
        let logSetTableRes = await logSetTable(data);
        if (logSetTableRes.code === 0) {
            logSetTableRes.data.forEach( item => {
                //动态添加key
                addKey(item, item._id);
                //时间转换
                item.ctime = timeChange(item.ctime);
            } );
            this.setState({
                total: logSetTableRes.total,
                tableData: logSetTableRes.data
            });
        };
    };
    //初始化
    async componentDidMount () {
        //获取日志配置列表
        let { current, pageSize } = this.state;
        let data = { current, pageSize };
        let logSetTableRes = await logSetTable(data);
        if (logSetTableRes.code === 0) {
            logSetTableRes.data.forEach( item => {
                //动态添加key
                addKey(item, item._id);
                //时间转换
                item.ctime = timeChange(item.ctime);
            } );
            this.setState({
                total: logSetTableRes.total,
                tableData: logSetTableRes.data
            });
        };
    };
    //分页
    logSetChangePage = async (val) => {
        this.setState({
            current: val
        });
        //获取日志配置列表
        let { pageSize, projNameVal, userVal, startTime, endTime } = this.state;
        let data = { current: val, pageSize, projNameVal, userVal, startTime, endTime };
        let logSetTableRes = await logSetTable(data);
        if (logSetTableRes.code === 0) {
            logSetTableRes.data.forEach( item => {
                //动态添加key
                addKey(item, item._id);
                //时间转换
                item.ctime = timeChange(item.ctime);
            } );
            this.setState({
                total: logSetTableRes.total,
                tableData: logSetTableRes.data
            });
        };
    };
    //查看功能
    getCheck = (record) => {
        let { _id } = record;
        _id = _id.substring(0, 7);
        this.props.history.push({
            pathname: `/home/log/config/detail/${_id}`,
            state: { id: record._id }
        });
    };
    render () {
        let { btnType, btnText, btnBlock, SetModalTitle, SetModalVisible, btnSearchType, btnSearchText, btnSearchBlock, tableData, pageSize, total } = this.state;
        return (
            <div className="LogSetStyle">
                {/* 创建项目 */}
                <div className="LogSetProject">
                    {/* 创建项目按钮 */}
                    <LogButton {...{btnType, btnText, btnBlock}} getBtnClick={this.getBtnClick}></LogButton>
                    {/* 创建项目弹窗 */}
                    <LogSetModal {...{SetModalTitle, SetModalVisible}} getSetOk={this.getSetOk} getSetCancel={this.getSetCancel}></LogSetModal>
                </div>
                {/* 搜索 */}
                <div className="LogSetSearch">
                    {/* 项目名称 */}
                    <div className="LogSetSearchItem">
                        <span className="LogSetSearchItemText">项目名称</span>
                        <LogInput getInpChange={this.getInpNameChange}></LogInput>
                    </div>
                    {/* 创建人 */}
                    <div className="LogSetSearchItem">
                        <span className="LogSetSearchItemText">创建人</span>
                        <LogInput getInpChange={this.getInpUserChange}></LogInput>
                    </div>
                    {/* 搜索 */}
                    <div className="LogSetSearchItem">
                        <LogButton btnType={btnSearchType} btnBlock={btnSearchBlock} btnText={btnSearchText} getBtnClick={this.getBtnSearch}></LogButton>
                    </div>
                </div>
                <div className="LogSetSearch">
                     {/* 创建时间 */}
                     <div className="LogSetSearchItem">
                        <span className="LogSetSearchItemText">创建时间</span>
                        <LogDatePicker getDateTime={this.getDateTime}></LogDatePicker>
                    </div>
                </div>
                {/* 项目列表 */}
                <div className="LogSetTable">
                    <LogSetTable {...{tableData, pageSize, total}} logSetChangePage={this.logSetChangePage} getCheck={this.getCheck}></LogSetTable>
                </div>
            </div>
        );
    };
};
