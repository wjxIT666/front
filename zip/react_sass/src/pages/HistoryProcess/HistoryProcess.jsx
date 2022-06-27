import React, { Component } from 'react';
import './HistoryProcess.less';
import X86Input from '../../components/X86_Input/X86_Input.jsx';
import X86Select from '../../components/X86_Select/X86_Select.jsx';
import X86Button from '../../components/X86_Button/X86_Button.jsx';
import Text from '../../components/Text/Text.jsx';
import X86HistoryProcessTable from '../../components/X86_Table/X86_HistoryProcessTable/X86_HistoryProcessTable.jsx';
import { processList, exitLoginKP } from '../../request/api.js';
import { tableColumnKey, timeChange, sessionStatus, timeStatus } from '../../js/common.js';
import { DatePicker, Space, Popover, message, Select } from 'antd';
import menuList from '../../router/router.js';
import store from '../../redux/store.js';
import '../../../node_modules/moment/locale/zh-cn';
import locale from '../../../node_modules/antd/lib/date-picker/locale/zh_CN'; //切换中文日期
const { RangePicker } = DatePicker;
const { Option } = Select;

export default class HistoryProcess extends Component {
    inputSize = 'middle';
    processIdName = '进程id';
    gameName = '游戏名称';
    applyButtonType = 'primary';
    processButtonSearch = '搜索';
    processIPName = '实例ip';
    processDateName = '开始时间';
    processStatusName = '状态';
    applySelectWidth = '1rem';
    applyButtonExit = '退出登录';
    gameNameValClear = null;
    processIdValClear = null;
    processIpClear = null;

    state = {
        processIdVal: '',
        gameNameVal: '',
        pageSize: 10,
        current: 1, 
        tableData: [],
        total: 0,
        processIpVal: '',
        startBeginTime: '',
        startEndTime: '',
        applyStatusList: [],
        applyStatusVal: '-1',
        applyReginList: [],
        applyReginVal: 'region-cc-xy',
        keyDate: '2',
        statusVal: ''
    };

    getInputValue = (inpVal) => {
        this.setState({
            processIdVal: inpVal
        });
    };

    gameNameValue = (inpVal) => {
        this.setState({
            gameNameVal: inpVal
        });
    };

    //实例ip
    processIpValue = (inpVal) => {
        this.setState({
            processIpVal: inpVal
        });
    };

    //开始时间
    onDateChange = (value, dateString) => {
        console.log(dateString, 'dateString', value);
        if (dateString[0] !== '' && dateString[1] !== '') {
            this.setState({
                startBeginTime: new Date(dateString[0]).valueOf().toString() === 'NaN' ? '' : new Date(dateString[0]).valueOf().toString(),
                startEndTime: new Date(dateString[1]).valueOf().toString() === 'NaN' ? '' : new Date(dateString[1]).valueOf().toString()
            });
        } else {
            this.setState({
                startBeginTime: '',
                startEndTime: ''
            });
        };
    };

    //状态改值
    getSelectValue = (selVal) => {
        this.setState({
            applyStatusVal: selVal
        });
    };

    //搜索
    getBtnSearch = async () => {
        let { current, pageSize, processIdVal, gameNameVal, processIpVal, startBeginTime, startEndTime, applyStatusVal, applyReginVal } = this.state;
        //获取游戏列表
        let data;
        if (startBeginTime !== '' && startEndTime !== '') {
            data = {"pageNum": current, "pageSize": pageSize, "processId": processIdVal, "appName": gameNameVal, "type": 2, instanceIp: processIpVal, startBeginTime, startEndTime, endType: applyStatusVal};
        } else {
            data = {"pageNum": current, "pageSize": pageSize, "processId": processIdVal, "appName": gameNameVal, "type": 2, instanceIp: processIpVal, endType: applyStatusVal};
        };
        console.log(applyStatusVal, '状态值');
        if (applyStatusVal === '-1') delete data.endType;
        let processListRes = await processList(data, applyReginVal);
        let { records } = processListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.processId);
            //开始时间转换
            item.startTime = timeChange(item.startTime);
            item.sessionStatus = sessionStatus(item.sessionStatus);
            item.duration = timeStatus(item.duration);
            return item;
        } );
        console.log(newRecords);
        if (newRecords.length !== 0) {
            this.setState({
                tableData: [...processListRes.data.records],
                total: processListRes.data.total,
            });  
        } else {
            this.setState({
                tableData: [],
                total: 0,
            });  
        };
    };

    async componentDidMount () {
        //获取状态列表
        const applyStatusList = [
            { name: '已停止', code: '1' },
            { name: '已结束', code: '2' },
            { name: '系统终止', code: '3' },
            { name: '全部', code: '-1' }
        ];
        this.setState({applyStatusList});

        //获取地域接口
        const applyReginList = [
            { name: '深圳', code: 'region-sz' },
            { name: '金华', code: 'region-ec-jh' },
            { name: '天津', code: 'region-nc-tj' },
            { name: '襄阳', code: 'region-cc-xy' },
            { name: '广州', code: 'region-sc-gz' }
        ];
        this.setState({applyReginList});
        //进程列表
        let { current, pageSize, applyReginVal } = this.state;
        let data = {"pageNum": current, "pageSize": pageSize, "type": 2};
        let processListRes = await processList(data, applyReginVal);
        let { records } = processListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.processId);
            //开始时间转换
            item.startTime = timeChange(item.startTime);
            item.sessionStatus = sessionStatus(item.sessionStatus);
            item.duration = timeStatus(item.duration);
            return item;
        } );
        //游戏列表
        this.setState({
            tableData: newRecords,
            total: processListRes.data.total
        }); 
    };

    //分页
    processChangePage = async (value) => {
        let { pageSize, processIdVal, gameNameVal, processIpVal, startBeginTime, startEndTime, applyStatusVal, applyReginVal } = this.state;
        //获取游戏列表
        let data;
        if (startBeginTime !== '' && startEndTime !== '') {
            data = {"pageNum": value, "pageSize": pageSize, "processId": processIdVal, "appName": gameNameVal, "type": 2, instanceIp: processIpVal, startBeginTime, startEndTime, endType: applyStatusVal};
        } else {
            data = {"pageNum": value, "pageSize": pageSize, "processId": processIdVal, "appName": gameNameVal, "type": 2, instanceIp: processIpVal, endType: applyStatusVal};
        };
        if (applyStatusVal === '-1') delete data.endType;
        let processListRes = await processList(data, applyReginVal);
        let { records } = processListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.processId);
            //开始时间转换
            item.startTime = timeChange(item.startTime);
            item.sessionStatus = sessionStatus(item.sessionStatus);
            item.duration = timeStatus(item.duration);
            return item;
        } );
        //游戏列表
        this.setState({
            tableData: newRecords,
            total: processListRes.data.total,
            current: value
        }); 
    };

    //清空数据--应用名称
    getInputClear = (inpValClear) => {
        this.gameNameValClear = inpValClear;
    };
    //清空数据--进程id
    getInputIdClear = (inpValClear) => {
        this.processIdValClear = inpValClear;
    };
    //清空数据--实例ip
    getInputIpClear = (inpValClear) => {
        this.processIpClear = inpValClear;
    };

    //退出登录
    exitLogin = async () => {
        let exitLoginRes = await exitLoginKP();
        let { code, msg } = exitLoginRes;
        if (code === 0) message.success('退出成功');
        else message.error(msg);
        //清空token
        sessionStorage.removeItem('token');
        //路径跳转--登录页
        this.props.history.push({
            pathname: '/'
        });
    };

    //地域选择
    getReginSelectValue = async (selVal) => {
        this.setState({
            applyReginVal: selVal
        });
        //进程列表
        let { current, pageSize } = this.state;
        let data = {"pageNum": current, "pageSize": pageSize, "type": 2};
        let processListRes = await processList(data, selVal);
        let { records } = processListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.processId);
            //开始时间转换
            item.startTime = timeChange(item.startTime);
            item.sessionStatus = sessionStatus(item.sessionStatus);
            item.duration = timeStatus(item.duration);
            return item;
        } );
        //游戏列表
        this.setState({
            tableData: newRecords,
            total: processListRes.data.total
        }); 
        //清空数据
        if (this.gameNameValClear !== null) this.gameNameValClear.current.setState({value: ''}); 
        if (this.processIdValClear !== null) this.processIdValClear.current.setState({value: ''}); 
        if (this.processIpClear !== null) this.processIpClear.current.setState({value: ''});
        this.setState({keyDate: new Date()});
        this.setState({
            startBeginTime: '',
            startEndTime: '',
            processIdVal: '',
            gameNameVal: '',
            processIpVal: '',
            applyStatusVal: '-1'
        });
    };

    render () {
        //面包屑逻辑
        let BreadcrumbName;
        let BreadcrumbNameList = [];
        BreadcrumbNameList = menuList.map( item => {
            if (item.path === this.props.location.pathname) return item.title;
        } );
        BreadcrumbNameList.forEach( item => {
            if (item === '账号管理') item = '账号信息';
            if (item !== undefined) BreadcrumbName = item;
        } );
        //气泡卡片内容
        let content = (
            <div>
                <X86Button applyButtonText={this.applyButtonExit} getBtnValue={this.exitLogin}></X86Button>
            </div>
        );
        //redux数据
        let userName = store.getState();

        let { tableData, current, pageSize, total, applyStatusList, applyStatusVal, applyReginList, applyReginVal, keyDate } = this.state;
        return (
            <div>
                {/* 面包屑 */}
                <div className="X86_HistoryBreadcrumbStyle">
                    {/* 账号信息 */}
                    <div className="X86_HistoryBreadcrumbAccount">
                        <Popover content={content} trigger="hover">
                            <span>{userName}</span>
                        </Popover>
                    </div>
                    {/* 面包屑 */}
                    <div className="X86_HistoryBreadcrumbTitle">
                        {/* 标题 */}
                        <div style={{marginRight: '10px'}}>
                            { BreadcrumbName }
                        </div>
                        {/* 地域 */}
                        <div>
                            <X86Select applySelectWidth={this.applySelectWidth} applyStatusList={applyReginList} applyStatusVal={applyReginVal} getSelectValue={this.getReginSelectValue}></X86Select>
                        </div>
                    </div>
                </div>
                {/* 列表 */}
                <div className="HistoryProcessStyle">
                    {/* 查询 */}
                    <div className="HistoryProcessQuery">
                        {/* 进程id */}
                        <div className="HistoryProcessQueryItem">
                            <span className="HistoryProcessQueryItemText"><Text TextContent={this.processIdName}></Text></span>
                            <X86Input inputSize={this.inputSize} getInputValue={this.getInputValue} getInputClear={this.getInputIdClear}></X86Input>
                        </div>
                        {/* 游戏名称 */}
                        <div className="HistoryProcessQueryItem">
                            <span className="HistoryProcessQueryItemText"><Text TextContent={this.gameName}></Text></span>
                            <X86Input inputSize={this.inputSize} getInputValue={this.gameNameValue} getInputClear={this.getInputClear}></X86Input>
                        </div>
                        {/* 搜索 */}
                        <div className="HistoryProcessQueryItem">
                            <X86Button applyButtonType={this.applyButtonType} applyButtonText={this.processButtonSearch} getBtnValue={this.getBtnSearch}></X86Button>
                        </div>
                    </div>
                    {/* 查询 */}
                    <div className="HistoryProcessQuery">
                        {/* 实例ip */}
                        <div className="HistoryProcessQueryItem">
                            <span className="HistoryProcessQueryItemText"><Text TextContent={this.processIPName}></Text></span>
                            <X86Input inputSize={this.inputSize} getInputValue={this.processIpValue} getInputClear={this.getInputIpClear}></X86Input>
                        </div>
                        {/* 开始时间 */}
                        <div className="HistoryProcessQueryItem">
                            <span className="HistoryProcessQueryItemText"><Text TextContent={this.processDateName}></Text></span>
                            <Space direction="vertical" size={12}>
                                <RangePicker 
                                    key={keyDate}
                                    onChange={this.onDateChange}
                                    locale={locale}
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            </Space>
                        </div>
                        {/* 状态 */}
                        <div className="HistoryProcessQueryItem" style={{alignItems: 'center'}}>
                            <span className="HistoryProcessQueryItemText"><Text TextContent={this.processStatusName}></Text></span>
                            {/* <X86Select applySelectWidth={this.applySelectWidth} applyStatusList={applyStatusList} applyStatusVal={applyStatusVal} getSelectValue={this.getSelectValue}></X86Select> */}
                            <Select value={applyStatusVal} onChange={this.getSelectValue} style={{width: this.applySelectWidth}}>
                                { 
                                    applyStatusList.map( item => {
                                        return (
                                            <Option key={item.code} value={item.code}>{item.name}</Option>
                                        );
                                    } )
                                }
                            </Select>
                        </div>
                    </div>
                    {/* 列表 */}
                    <div className="HistoryProcessList">
                        <X86HistoryProcessTable {...{tableData, current, pageSize, total}} processChangePage={this.processChangePage}></X86HistoryProcessTable>
                    </div>
                </div>
            </div>
        );
    };
};
