import React, { Component } from 'react';
import './Cloud.less';
import X86Input from '../../components/X86_Input/X86_Input.jsx';
import X86Button from '../../components/X86_Button/X86_Button.jsx';
import X86CloudTable from '../../components/X86_Table/X86_CloudTable/X86_CloudTable.jsx';
import Text from '../../components/Text/Text.jsx';
import { arrayLength } from '../../js/rules.js';
import { cloudList, cloudReset, exitLoginKP, cloudRegin } from '../../request/api.js';
import { tableColumnKey, timeChange } from '../../js/common.js';
import { message, Popover, Select } from 'antd';
import menuList from '../../router/router.js';
import store from '../../redux/store.js';
const { Option } = Select;

export default class Cloud extends Component {
    inputSize = 'middle';
    cloudIdName = '设备id';
    applyButtonType = 'primary';
    cloudButtonSearch = '搜索';
    cloudIdStatus = '设备状态';
    cloudButtonReboot = '重启';
    timer = null;
    statusVal = false;
    cloudIpName = '设备ip';
    applyButtonExit = '退出登录';
    applySelectWidth = '1.2rem';
    getInputIdClearC = null;
    getComputStatusClearC = null;
    getInputIpClearC = null;

    state = {
        cloudIdVal: '',
        cloudStatus: '',
        selectedRowKeys: [],
        tableData: [],
        pageSize: 10,
        current: 1,
        total: 0,
        btnDisabled: false,
        cloudIpVal: '',
        applyStatusList: [],
        applyStatusVal: ''
    };

    getInputValue = (inpVal) => {
        this.setState({
            cloudIdVal: inpVal
        });
    };

    //ip
    getIpInputValue = (inpVal) => {
        this.setState({
            cloudIpVal: inpVal
        });
    };
    //搜索
    getBtnSearch = async () => {
        let { current, pageSize, cloudIdVal, cloudStatus, cloudIpVal, applyStatusVal } = this.state;
        //获取游戏列表
        let data = {"pageNum": current, "pageSize": pageSize, "instanceId": cloudIdVal, "status": cloudStatus, ip: cloudIpVal};
        for (let key in data) {
            if (data[key] === '') {
                delete data[key];
            };
        };
        let cloudListRes = await cloudList(data, applyStatusVal);
        let { records } = cloudListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.instanceId);
            //时间转换
            item.createTime = timeChange(item.createTime);
            return item;
        } );
        console.log(newRecords);
        if (newRecords.length !== 0) {
            this.setState({
                tableData: [...cloudListRes.data.records],
                total: cloudListRes.data.total,
            });  
        } else {
            this.setState({
                tableData: [],
                total: 0,
            });  
        };
    };

    getComputStatusValue = (inpVal) => {
        this.setState({
            cloudStatus: inpVal
        });
    };

    getBtnReboot = async () => {
        let { selectedRowKeys, applyStatusVal } = this.state;
        console.log(selectedRowKeys);
        let selectedRowKeysError = arrayLength(selectedRowKeys, '请选择');
        if (!selectedRowKeysError) return false;
        //重启接口
        let data = {"instanceIds": selectedRowKeys};
        let cloudResetRes = await cloudReset(data, applyStatusVal);
        if (cloudResetRes.result === true) {
            message.success('重启中');
            this.setState({btnDisabled: true});
            this.timer = setInterval( async () => {
                let { current, pageSize, applyStatusVal } = this.state;
                let data = {"pageNum": current, "pageSize": pageSize};
                let cloudListRes = await cloudList(data, applyStatusVal);
                let { records } = cloudListRes.data;
                let newRecords = records.map( item => {
                    //添加key
                    tableColumnKey(item, 'key', item.instanceId);
                    //时间转换
                    item.createTime = timeChange(item.createTime);
                    return item;
                } );
                this.statusVal = newRecords.every( item => item.status === 'running' );
                //游戏列表
                this.setState({
                    tableData: newRecords,
                    total: cloudListRes.data.total
                }); 
                if (this.statusVal) {
                    clearInterval(this.timer);
                    message.success('重启成功');
                    this.setState({btnDisabled: false});
                };
            }, 1000 );
        } else {
            message.error('操作失败');
        };
    };

    getselectedRowKeys = (selectedRowKeys) => {
        this.setState({
            selectedRowKeys
        });
    };

    async componentDidMount () {
        //区域列表
        const reginRes = await cloudRegin();
        console.log(reginRes, 'reginRes');
        if (reginRes.code === 'Common.Success') {
            this.setState({
                applyStatusList: [...reginRes.data],
                applyStatusVal: reginRes.data[6].region
            });
        };
        //设备列表
        let { current, pageSize, applyStatusVal } = this.state;
        let data = {"pageNum": current, "pageSize": pageSize};
        let cloudListRes = await cloudList(data, applyStatusVal);
        console.log(cloudListRes);
        let { records } = cloudListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.instanceId);
            //时间转换
            item.createTime = timeChange(item.createTime);
            return item;
        } );
        //游戏列表
        this.setState({
            tableData: newRecords,
            total: cloudListRes.data.total
        }); 
    };

    //分页
    cloudChangePage = async (value) => {
        let { pageSize, cloudIdVal, cloudStatus, cloudIpVal, applyStatusVal } = this.state;
        //获取游戏列表
        let data = {"pageNum": value, "pageSize": pageSize, "instanceId": cloudIdVal, "status": cloudStatus, ip: cloudIpVal};
        for (let key in data) {
            if (data[key] === '') {
                delete data[key];
            };
        };
        let cloudListRes = await cloudList(data, applyStatusVal);
        let { records } = cloudListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.instanceId);
            //时间转换
            item.createTime = timeChange(item.createTime);
            return item;
        } );
        //游戏列表
        this.setState({
            tableData: newRecords,
            total: cloudListRes.data.total,
            current: value
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

    //地域选择
    getSelectValue = async (selVal) => {
        this.setState({
            applyStatusVal: selVal 
        });
        //设备列表
        let { current, pageSize } = this.state;
        let data = {"pageNum": current, "pageSize": pageSize};
        let cloudListRes = await cloudList(data, selVal);
        let { records } = cloudListRes.data;
        let newRecords = records.map( item => {
            //添加key
            tableColumnKey(item, 'key', item.instanceId);
            //时间转换
            item.createTime = timeChange(item.createTime);
            return item;
        } );
        //游戏列表
        this.setState({
            tableData: newRecords,
            total: cloudListRes.data.total
        }); 
        //清空数据
        if (this.getInputIdClearC !== null) this.getInputIdClearC.current.setState({value: ''}); 
        if (this.getComputStatusClearC !== null) this.getComputStatusClearC.current.setState({value: ''}); 
        if (this.getInputIpClearC !== null) this.getInputIpClearC.current.setState({value: ''});
        this.setState({
            cloudIdVal: '',
            cloudIpVal: '',
            cloudStatus: ''
        });
    };

    getInputIdClear = (inpValClear) => {
        this.getInputIdClearC = inpValClear;
    };

    getComputStatusClear = (inpValClear) => {
        this.getComputStatusClearC = inpValClear;
    };

    getInputIpClear = (inpValClear) => {
        this.getInputIpClearC = inpValClear;
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
        //列表数据
        let { tableData, current, pageSize, total, btnDisabled, applyStatusList, applyStatusVal } = this.state;
        return (
            <div>
                {/* 面包屑 */}
                <div className="X86_CloudBreadcrumbStyle">
                    {/* 账号信息 */}
                    <div className="X86_CloudBreadcrumbAccount">
                        <Popover content={content} trigger="hover">
                            <span>{userName}</span>
                        </Popover>
                    </div>
                    {/* 面包屑 */}
                    <div className="X86_CloudBreadcrumbTitle">
                        {/* 标题 */}
                        <div style={{marginRight: '10px'}}>
                            { BreadcrumbName }
                        </div>
                        {/* 地域 */}
                        <div>
                            <Select value={applyStatusVal} onChange={this.getSelectValue} style={{width: this.applySelectWidth}}>
                                    { 
                                        applyStatusList.map( item => {
                                            return (
                                                <Option key={item.region} value={item.region}>{item.remark}</Option>
                                            );
                                        } )
                                    }
                            </Select>
                        </div>
                    </div>
                </div>
                {/* 列表 */}
                <div className="CloudStyle">
                    {/* 查询 */}
                    <div className="CloudQuery" style={{border: '0'}}>
                        {/* 设备id */}
                        <div className="CloudQueryItem">
                            <span className="CloudQueryItemText"><Text TextContent={this.cloudIdName}></Text></span>
                            <X86Input inputSize={this.inputSize} getInputValue={this.getInputValue} getInputClear={this.getInputIdClear}></X86Input>
                        </div>
                        {/* 设备状态 */}
                        <div className="CloudQueryItem">
                            <span className="CloudQueryItemText"><Text TextContent={this.cloudIdStatus}></Text></span>
                            <X86Input inputSize={this.inputSize} getInputValue={this.getComputStatusValue} getInputClear={this.getComputStatusClear}></X86Input>
                        </div>
                        {/* 搜索 */}
                        <div className="CloudQueryItem">
                            <X86Button applyButtonType={this.applyButtonType} applyButtonText={this.cloudButtonSearch} getBtnValue={this.getBtnSearch}></X86Button>
                        </div>
                        {/* 重启 */}
                        <div className="CloudQueryItem">
                            <X86Button btnDisabled={btnDisabled} applyButtonType={this.applyButtonType} applyButtonText={this.cloudButtonReboot} getBtnValue={this.getBtnReboot}></X86Button>
                        </div>
                    </div>
                    {/* 查询 */}
                    <div className="CloudQuery">
                        {/* 设备ip */}
                        <div className="CloudQueryItem">
                            <span className="CloudQueryItemText"><Text TextContent={this.cloudIpName}></Text></span>
                            <X86Input inputSize={this.inputSize} getInputValue={this.getIpInputValue} getInputClear={this.getInputIpClear}></X86Input>
                        </div>
                    </div>
                    {/* 列表 */}
                    <div className="CloudList">
                        <X86CloudTable {...{tableData, current, pageSize, total}} getselectedRowKeys={this.getselectedRowKeys} cloudChangePage={this.cloudChangePage}></X86CloudTable>
                    </div>
                </div>
            </div>
        );
    };
};
