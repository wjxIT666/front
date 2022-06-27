import React, { Component } from 'react';
import './Process.less';
import X86Input from '../../components/X86_Input/X86_Input.jsx';
import X86Button from '../../components/X86_Button/X86_Button.jsx';
import X86Select from '../../components/X86_Select/X86_Select.jsx';
import Text from '../../components/Text/Text.jsx';
import X86ProcessTable from '../../components/X86_Table/X86_ProcessTable/X86_ProcessTable.jsx';
import { arrayLength } from '../../js/rules.js';
import { processList, gameOver, exitLoginKP } from '../../request/api.js';
import { tableColumnKey, timeChange, sessionStatus, timeStatus } from '../../js/common.js';
import { message, DatePicker, Space, Popover } from 'antd';
import menuList from '../../router/router.js';
import store from '../../redux/store.js';
import '../../../node_modules/moment/locale/zh-cn';
import locale from '../../../node_modules/antd/lib/date-picker/locale/zh_CN'; //切换中文日期
const { RangePicker } = DatePicker;

export default class Process extends Component {
    inputSize = 'middle';
    processIdName = '进程id';
    gameName = '游戏名称';
    applyButtonType = 'primary';
    processButtonSearch = '搜索';
    processButtonConnect = '群控';
    processIPName = '实例ip';
    processDateName = '开始时间';
    applyButtonExit = '退出登录';
    applySelectWidth = '1rem';
    gameNameValClear = null;
    processIdValClear = null;
    processIpClear = null;

    state = {
        processIdVal: '',
        gameNameVal: '',
        selectedRowKeys: [],
        pageSize: 10,
        current: 1, 
        tableData: [],
        total: 0,
        processIpVal: '',
        startBeginTime: '',
        startEndTime: '',
        applyStatusList: [],
        applyStatusVal: 'region-cc-xy',
        keyDate: '1'
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

    //开始时间--改变触发
    onDateChange = (value, dateString) => {
        console.log(dateString, 'dateString', '改变触发');
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

    //搜索
    getBtnSearch = async () => {
        let { current, pageSize, processIdVal, gameNameVal, processIpVal, startBeginTime, startEndTime, applyStatusVal } = this.state;
        console.log(startBeginTime + '~', 'startBeginTime', startEndTime + '~', 'startEndTime');
        //获取游戏列表
        let data;
        if (startBeginTime !== '' && startEndTime !== '') {
            data = {"pageNum": current, "pageSize": pageSize, "processId": processIdVal, "appName": gameNameVal, "type": 1, instanceIp: processIpVal, startBeginTime, startEndTime};
        } else {
            data = {"pageNum": current, "pageSize": pageSize, "processId": processIdVal, "appName": gameNameVal, "type": 1, instanceIp: processIpVal};
        };
        let processListRes = await processList(data, applyStatusVal);
        let { records } = processListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.sessionToken);
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
                total: processListRes.data.total
            });  
        } else {
            this.setState({
                tableData: [],
                total: 0,
            });  
        };
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


    getBtnConnect = () => {
        let { selectedRowKeys, applyStatusVal } = this.state;
        let selectedRowKeysError = arrayLength(selectedRowKeys, '请选择');
        if (!selectedRowKeysError) return false;
        sessionStorage.setItem('selectedRowKeys', JSON.stringify(selectedRowKeys));
        sessionStorage.setItem('regin', applyStatusVal);
        document.querySelector('#root').style.height = '0';
        this.props.history.push({
            pathname: '/colonyControl'
        });
    };

    getselectedRowKeys = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys
        });
    };

    async componentDidMount () {
        //获取地域接口
        const applyStatusList = [
            { name: '深圳', code: 'region-sz' },
            { name: '金华', code: 'region-ec-jh' },
            { name: '天津', code: 'region-nc-tj' },
            { name: '襄阳', code: 'region-cc-xy' },
            { name: '广州', code: 'region-sc-gz' }
        ];
        this.setState({applyStatusList});
        //进程列表
        let { current, pageSize, applyStatusVal } = this.state;
        let data = {"pageNum": current, "pageSize": pageSize, "type": 1};
        let processListRes = await processList(data, applyStatusVal);
        let { records } = processListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.sessionToken);
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
        let { pageSize, processIdVal, gameNameVal, processIpVal, startBeginTime, startEndTime, applyStatusVal } = this.state;
        //获取游戏列表
        let data;
        if (startBeginTime !== '' && startEndTime !== '') {
            data = {"pageNum": value, "pageSize": pageSize, "processId": processIdVal, "appName": gameNameVal, "type": 1, instanceIp: processIpVal, startBeginTime, startEndTime};
        } else {
            data = {"pageNum": value, "pageSize": pageSize, "processId": processIdVal, "appName": gameNameVal, "type": 1, instanceIp: processIpVal};
        };
        let processListRes = await processList(data, applyStatusVal);
        let { records } = processListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.sessionToken);
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

    //直连
    getProcessConect = (record) => {
        let { sessionToken } = record;
        let { applyStatusVal } = this.state;
        //页面跳转--在新页面打开
        window.open(`https://demo.h5.kuaipantech.com/wmdj/zhilian/public/index.html?token=${sessionToken}&address=${applyStatusVal}`);
    };

    //中止
    getProcessStop = async (record) => {
        console.log('中止', record);
        let { processId } = record;
        let data = {processIds: [processId]};
        let { applyStatusVal } = this.state;
        //游戏中止
        let gameOverRes = await gameOver(data, applyStatusVal);
        console.log(gameOverRes);
        if (gameOverRes.result === true) {
            let { current, pageSize, applyStatusVal } = this.state;
            let data = {"pageNum": current, "pageSize": pageSize, "type": 1};
            let processListRes = await processList(data, applyStatusVal);
            let { records } = processListRes.data;
            let newRecords = records.map( item => {
                //添加key
                tableColumnKey(item, 'key', item.sessionToken);
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
            message.success('操作成功');
        };
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
    getSelectValue = async (selVal) => {
        this.setState({
            applyStatusVal: selVal
        });
        //进程列表
        let { current, pageSize } = this.state;
        let data = {"pageNum": current, "pageSize": pageSize, "type": 1};
        let processListRes = await processList(data, selVal);
        let { records } = processListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.sessionToken);
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
            processIpVal: ''
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

        //列表逻辑
        let { tableData, current, pageSize, total, applyStatusList, applyStatusVal, keyDate } = this.state;
        return (
            <div>
                {/* 面包屑 */}
                <div className="X86_BreadcrumbStyle">
                    {/* 账号信息 */}
                    <div className="X86_BreadcrumbAccount">
                        <Popover content={content} trigger="hover">
                            <span>{userName}</span>
                        </Popover>
                    </div>
                    {/* 面包屑 */}
                    <div className="X86_BreadcrumbTitle">
                        {/* 标题 */}
                        <div style={{marginRight: '10px'}}>
                            { BreadcrumbName }
                        </div>
                        {/* 地域 */}
                        <div>
                            <X86Select applySelectWidth={this.applySelectWidth} applyStatusList={applyStatusList} applyStatusVal={applyStatusVal} getSelectValue={this.getSelectValue}></X86Select>
                        </div>
                    </div>
                </div>
                {/* 列表 */}
                <div className="ProcessStyle">
                    {/* 查询 */}
                    <div className="ProcessQuery">
                        {/* 进程id */}
                        <div className="ProcessQueryItem">
                            <span className="ProcessQueryItemText"><Text TextContent={this.processIdName}></Text></span>
                            <X86Input inputSize={this.inputSize} getInputValue={this.getInputValue} getInputClear={this.getInputIdClear}></X86Input>
                        </div>
                        {/* 游戏名称 */}
                        <div className="ProcessQueryItem">
                            <span className="ProcessQueryItemText"><Text TextContent={this.gameName}></Text></span>
                            <X86Input inputSize={this.inputSize} getInputValue={this.gameNameValue} getInputClear={this.getInputClear}></X86Input>
                        </div>
                        {/* 搜索 */}
                        <div className="ProcessQueryItem">
                            <X86Button applyButtonType={this.applyButtonType} applyButtonText={this.processButtonSearch} getBtnValue={this.getBtnSearch}></X86Button>
                        </div>
                        {/* 直连 */}
                        <div className="ProcessQueryItem">
                            <X86Button applyButtonType={this.applyButtonType} applyButtonText={this.processButtonConnect} getBtnValue={this.getBtnConnect}></X86Button>
                        </div>
                    </div>
                    {/* 查询 */}
                    <div className="ProcessQuery">
                        {/* 实例ip */}
                        <div className="ProcessQueryItem">
                            <span className="ProcessQueryItemText"><Text TextContent={this.processIPName}></Text></span>
                            <X86Input inputSize={this.inputSize} getInputValue={this.processIpValue} getInputClear={this.getInputIpClear}></X86Input>
                        </div>
                        {/* 开始时间 */}
                        <div className="ProcessQueryItem">
                            <span className="ProcessQueryItemText"><Text TextContent={this.processDateName}></Text></span>
                            <Space direction="vertical" size={12}>
                                <RangePicker 
                                    key={keyDate}
                                    onChange={this.onDateChange}
                                    locale={locale}
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            </Space>
                        </div>
                    </div>
                    {/* 列表 */}
                    <div className="ProcessList">
                        <X86ProcessTable {...{tableData, current, pageSize, total}} getselectedRowKeys={this.getselectedRowKeys} getProcessConect={this.getProcessConect} getProcessStop={this.getProcessStop} processChangePage={this.processChangePage}></X86ProcessTable>
                    </div>
                </div>
            </div>
        );
    };
};
