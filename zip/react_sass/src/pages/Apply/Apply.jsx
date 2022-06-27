import React, { Component } from 'react';
import './Apply.less';
import X86Input from '../../components/X86_Input/X86_Input.jsx';
import X86Select from '../../components/X86_Select/X86_Select.jsx';
import X86Button from '../../components/X86_Button/X86_Button.jsx';
import X86Table from '../../components/X86_Table/X86_Table.jsx';
import X86Modal from '../../components/X86_Modal/X86_Modal.jsx';
import Text from '../../components/Text/Text.jsx';
import { lengthRule, specialUnicode } from '../../js/rules.js';
import { applyGameList, publishGame, startGame, getToken, exitLoginKP } from '../../request/api.js';
import { tableColumnKey, timeChange, regionChinese, publishChange, sizeChange } from '../../js/common.js';
import { message, Popover } from 'antd';
import menuList from '../../router/router.js';
import store from '../../redux/store.js';

export default class Apply extends Component {
    inputSize = 'middle';
    applyName = '应用名称';
    applyStatus = '应用状态';
    applySelectWidth = '1rem';
    applyButtonType = 'primary';
    applyButtonSearch = '搜索';
    applyButtonAdd = '新增应用';
    timer = null;
    timerNull = '';
    applyButtonExit = '退出登录';
    state = {
        applyNameVal: '',
        applyStatusList: [],
        applyStatusVal: '-1',
        modalText: '新增应用',
        modalVisible: false,
        modalOkText: '确认',
        modalCancelText: '取消',
        tableData: [],
        pageSize: 10,
        current: 1,
        total: 0,
        btnDisabled: false
    };
    getInputValue = (inpVal) => {
        this.setState({
            applyNameVal: inpVal
        });
    };
    getSelectValue = (selVal) => {
        this.setState({
            applyStatusVal: selVal
        });
    };
    //搜索
    getBtnSearch = async () => {
        let { current, pageSize, applyNameVal, applyStatusVal } = this.state;
        let unicodeRes = specialUnicode(applyNameVal, '不能输入特殊字符');
        let lengthRes = lengthRule(applyNameVal, 20, '长度不能超过20字符');
        if (!unicodeRes || !lengthRes) return false;
        else {
            //获取游戏列表
            let data = {"pageNum": current, "pageSize": pageSize, "appName": applyNameVal, "publish": applyStatusVal};
            let applyGameListRes = await applyGameList(data);
            let { records } = applyGameListRes.data;
            let newRecords = records.map( item => {
                //添加key
                tableColumnKey(item, 'key', item.appCode);
                //版本信息
                if (item.versionInfo !== null) {
                    //状态转换
                    item.versionInfo.publish = publishChange(item.versionInfo.publish);
                    //大小转换
                    item.versionInfo.size = sizeChange(item.versionInfo.size);
                    //添加版本信息
                    tableColumnKey(item, 'path', item.versionInfo.packageName);
                    tableColumnKey(item, 'size', item.versionInfo.size);
                    tableColumnKey(item, 'publish', item.versionInfo.publish);
                }; 
                //时间转换
                item.createTime = timeChange(item.createTime);
                //区域转换
                item.regions = regionChinese(item.regions);
                return item;
            } );
            console.log(newRecords);
            if (newRecords.length !== 0) {
                this.setState({
                    tableData: [...applyGameListRes.data.records],
                    total: applyGameListRes.data.total,
                });  
            } else {
                this.setState({
                    tableData: [],
                    total: 0,
                });  
            };
        };
    };
    getBtnAdd = () => {
        this.setState({
            modalVisible: true
        });
    };
    modalCancel = (flag) => {
        this.setState({
            modalVisible: flag
        });
    };
    modalOk = (flag) => {
        this.setState({
            modalVisible: flag
        });
    };
    async componentDidMount () {
        //应用状态
        const applyStatusList = [
            { name: '待发布', code: '0' },
            { name: '发布中', code: '1' },
            { name: '已发布', code: '2' },
            { name: '全部', code: '-1' }
        ];
        this.setState({applyStatusList});
        //游戏列表
        let { current, pageSize, applyStatusVal } = this.state;
        //获取游戏列表
        let data = {"pageNum": current, "pageSize": pageSize, "publish": applyStatusVal};
        let applyGameListRes = await applyGameList(data);
        console.log(applyGameListRes.data);
        let { records } = applyGameListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.appCode);
            //版本信息
            if (item.versionInfo !== null) {
                //状态转换
                item.versionInfo.publish = publishChange(item.versionInfo.publish);
                //大小转换
                item.versionInfo.size = sizeChange(item.versionInfo.size);
                //添加版本信息
                tableColumnKey(item, 'path', item.versionInfo.packageName);
                tableColumnKey(item, 'size', item.versionInfo.size);
                tableColumnKey(item, 'publish', item.versionInfo.publish);
            }; 
            //时间转换
            item.createTime = timeChange(item.createTime);
            //区域转换
            item.regions = regionChinese(item.regions);
            return item;
        } );
        //游戏列表
        this.setState({
            tableData: newRecords,
            total: applyGameListRes.data.total
        }); 
    };
    //分页
    applyChangePage = async (value) => {
        let { pageSize, applyNameVal, applyStatusVal } = this.state;
        //获取游戏列表
        let data = {"pageNum": value, "pageSize": pageSize, "appName": applyNameVal, "publish": applyStatusVal};
        let applyGameListRes = await applyGameList(data);
        let { records } = applyGameListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.appCode);
            //版本信息
            if (item.versionInfo !== null) {
                //状态转换
                item.versionInfo.publish = publishChange(item.versionInfo.publish);
                //大小转换
                item.versionInfo.size = sizeChange(item.versionInfo.size);
                //添加版本信息
                tableColumnKey(item, 'path', item.versionInfo.packageName);
                tableColumnKey(item, 'size', item.versionInfo.size);
                tableColumnKey(item, 'publish', item.versionInfo.publish);
            }; 
            //时间转换
            item.createTime = timeChange(item.createTime);
            //区域转换
            item.regions = regionChinese(item.regions);
            return item;
        } );
        console.log(newRecords);
        //游戏列表
        this.setState({
            tableData: [...applyGameListRes.data.records],
            total: applyGameListRes.data.total,
            current: value
        });
    };
    //分发应用--确认
    getModalBuildOk = async (record) => {
        let { appCode } = record;
        this.setState({
            btnDisabled: true
        });
        //分发应用接口
        let publishGameRes = await publishGame({"appCode": appCode});
        if (publishGameRes.message === "Success") {
            //游戏列表
            let { current, pageSize } = this.state;
            //发布中
            message.info('发布中');
            //设置定时器
            this.timer = setInterval( async () => {
                //获取游戏列表
                let data = {"pageNum": current, "pageSize": pageSize, "publish": '-1'};
                let applyGameListRes = await applyGameList(data);
                let { records } = applyGameListRes.data;
                let newRecords = records.map( item => {
                    //添加key
                    tableColumnKey(item, 'key', item.appCode);
                    //版本信息
                    if (item.versionInfo !== null) {
                        //状态转换
                        item.versionInfo.publish = publishChange(item.versionInfo.publish);
                        //大小转换
                        item.versionInfo.size = sizeChange(item.versionInfo.size);
                        //添加版本信息
                        tableColumnKey(item, 'path', item.versionInfo.packageName);
                        tableColumnKey(item, 'size', item.versionInfo.size);
                        tableColumnKey(item, 'publish', item.versionInfo.publish);

                        if (item.appCode === appCode) {
                            this.timerNull = item.versionInfo.publish;
                            if (this.timerNull === '已发布') {
                                clearInterval(this.timer);
                                message.success('发布成功');
                                this.setState({
                                    btnDisabled: false
                                });
                            };
                        };
                    }; 
                    //时间转换
                    item.createTime = timeChange(item.createTime);
                    //区域转换
                    item.regions = regionChinese(item.regions);
                    return item;
                } );
                //游戏列表
                this.setState({
                    tableData: newRecords,
                    total: applyGameListRes.data.total
                }); 
            } , 1000);
        };
    };
    //浏览器启动
    applyStart = async (record, regin) => {
        console.log(record, 'regin', regin);
        //获取游戏token
        let getTokenRes = await getToken();
        if (getTokenRes.result === true) {
            let tokenSession = getTokenRes.data.sessionToken;
            let { appCode } = record;
            //启动游戏
            let data = {"code": appCode, "appSpec": 'cls.c10gn28', "sessionType": 1, "sessionToken": tokenSession,  "customRunningId": parseInt(Math.random()*(999999-1)+1), "clientType": "WebRtc", privateNode: true};
            (regin !== 'region-ec-jh' && regin !== 'region-cc-xy') && delete data.privateNode;
            (regin === 'region-sc-gz') && (data.appSpec = 'cls.c8gn24.n3060');
            let startGameRes = await startGame(data, regin);
            console.log(startGameRes);
            if (startGameRes.result === true) {
                message.success('启动成功');
            } else if (startGameRes.result === false) {
                if (startGameRes.code === 'App.MaxConcurrency') {
                    message.error('已经超过最高并发数');
                };
            };
        };
    };
    //创建游戏成功更新页面
    gameApplySuucess = async () => {
        let { current, pageSize, applyStatusVal } = this.state;
        //获取游戏列表
        let data = {"pageNum": current, "pageSize": pageSize, "publish": applyStatusVal};
        let applyGameListRes = await applyGameList(data);
        console.log(applyGameListRes.data);
        let { records } = applyGameListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.appCode);
            //版本信息
            if (item.versionInfo !== null) {
                //状态转换
                item.versionInfo.publish = publishChange(item.versionInfo.publish);
                //大小转换
                item.versionInfo.size = sizeChange(item.versionInfo.size);
                //添加版本信息
                tableColumnKey(item, 'path', item.versionInfo.packageName);
                tableColumnKey(item, 'size', item.versionInfo.size);
                tableColumnKey(item, 'publish', item.versionInfo.publish);
            }; 
            //时间转换
            item.createTime = timeChange(item.createTime);
            //区域转换
            item.regions = regionChinese(item.regions);
            return item;
        } );
        //游戏列表
        this.setState({
            tableData: newRecords,
            total: applyGameListRes.data.total
        }); 
    };
    //更新版本成功更新页面
    gameUpdateApplySuucess = async () => {
        let { current, pageSize, applyStatusVal } = this.state;
        //获取游戏列表
        let data = {"pageNum": current, "pageSize": pageSize, "publish": applyStatusVal};
        let applyGameListRes = await applyGameList(data);
        console.log(applyGameListRes.data);
        let { records } = applyGameListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.appCode);
            //版本信息
            if (item.versionInfo !== null) {
                //状态转换
                item.versionInfo.publish = publishChange(item.versionInfo.publish);
                //大小转换
                item.versionInfo.size = sizeChange(item.versionInfo.size);
                //添加版本信息
                tableColumnKey(item, 'path', item.versionInfo.packageName);
                tableColumnKey(item, 'size', item.versionInfo.size);
                tableColumnKey(item, 'publish', item.versionInfo.publish);
            }; 
            //时间转换
            item.createTime = timeChange(item.createTime);
            //区域转换
            item.regions = regionChinese(item.regions);
            return item;
        } );
        //游戏列表
        this.setState({
            tableData: newRecords,
            total: applyGameListRes.data.total
        }); 
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

    //清空数据
    getInputIpClear = (clearInpVal) => {

    };
    
    render () {
        // 响应面包屑
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
        let { tableData, current, pageSize, total, applyStatusVal, applyStatusList, modalText, modalVisible, modalOkText, modalCancelText, btnDisabled } = this.state;
        return (
            <div>
                {/* 面包屑 */}
                <div className="X86_ApplyBreadcrumbStyle">
                    {/* 账号信息 */}
                    <div className="X86_ApplyBreadcrumbAccount">
                        <Popover content={content} trigger="hover">
                            <span>{userName}</span>
                        </Popover>
                    </div>
                    {/* 面包屑 */}
                    <div>
                        { BreadcrumbName }
                    </div>
                </div>
                {/* 列表 */}
                <div className="ApplyStyle">
                    {/* 查询 */}
                    <div className="ApplyQuery">
                        {/* 应用名称 */}
                        <div className="ApplyQueryItem">
                            <span className="ApplyQueryItemText"><Text TextContent={this.applyName}></Text></span>
                            <X86Input inputSize={this.inputSize} getInputValue={this.getInputValue} getInputClear={this.getInputIpClear}></X86Input>
                        </div>
                        {/* 应用状态 */}
                        <div className="ApplyQueryItem">
                            <span className="ApplyQueryItemText"><Text TextContent={this.applyStatus}></Text></span>
                            <X86Select applySelectWidth={this.applySelectWidth} applyStatusList={applyStatusList} applyStatusVal={applyStatusVal} getSelectValue={this.getSelectValue}></X86Select>
                        </div>
                        {/* 搜索 */}
                        <div className="ApplyQueryItem">
                            <X86Button btnDisabled={btnDisabled} applyButtonType={this.applyButtonType} applyButtonText={this.applyButtonSearch} getBtnValue={this.getBtnSearch}></X86Button>
                        </div>
                        {/* 新增应用 */}
                        <div>
                            <X86Button btnDisabled={btnDisabled} applyButtonType={this.applyButtonType} applyButtonText={this.applyButtonAdd} getBtnValue={this.getBtnAdd}></X86Button>
                        </div>
                    </div>
                    {/* 列表 */}
                    <div className="ApplyList">
                        <X86Table {...{tableData, current, pageSize, total, btnDisabled}} applyChangePage={this.applyChangePage} getModalBuildOk={this.getModalBuildOk} applyStart={this.applyStart} gameUpdateApplySuucess={this.gameUpdateApplySuucess}></X86Table>
                    </div>
                    {/* 弹窗---新增应用 */}
                    <X86Modal {...{modalText, modalVisible, modalOkText, modalCancelText}} modalCancel={this.modalCancel} modalOk={this.modalOk} gameApplySuucess={this.gameApplySuucess}></X86Modal>
                </div>
            </div>
        );
    };
};
