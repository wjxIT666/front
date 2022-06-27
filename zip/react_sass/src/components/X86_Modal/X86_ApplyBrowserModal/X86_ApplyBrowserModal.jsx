import React, { Component } from 'react';
import { Modal, Form,  Select } from 'antd';
import { regionCode } from '../../../js/common.js';
const { Item } = Form;
const { Option } = Select;

export default class X86_ApplyBrowserModal extends Component {
    signRes = '';
    applyReginList = [];
    applyReginDefaultVal = '';
    state = {
        applyHashRate: '1*NVIDA 1660S',
        applyHashRateList: [],
        applyHashRateDefaultVal: '1*NVIDA 1660S'
    };
    modalCancel = () => {
        this.props.modalBrowserCancel(false);
    };
    modalOk = async () => {
        this.props.modalBrowserOk(false);
        this.props.browserApplySuucess(regionCode(this.applyReginDefaultVal));
    };
    componentDidMount () {
        //获取算力接口--自定义
        let hashRate = [
            {
                name: '1*NVIDA 1660S',
                value: '1*NVIDA 1660S'
            },
            {
                name: '1*NVIDA 2060S',
                value: '1*NVIDA 2060S'
            }
        ];
        this.setState({
            applyHashRateList: [...hashRate]
        });
    };

    //选择地区
    applyPathChange = (regin) => {
        this.applyReginDefaultVal = regin;
    };

    //选择算力
    applyHashRateChange = (hashRate) => {
        this.setState({
            applyHashRate: hashRate
        });
    };

    render () {
        let { applyHashRateList, applyHashRateDefaultVal } = this.state;
        let { modalBrowserText, modalBrowserVisible, modalBrowserOkText, modalBrowserCancelText, applyStartRecord } = this.props;
        console.log(applyStartRecord, 'applyStartRecord');
        if (applyStartRecord !== null) {
            //区域
            this.applyReginList = applyStartRecord.regions.split(' ');
            this.applyReginDefaultVal = applyStartRecord.regions.split(' ')[0];
        } else {
            //区域
            this.applyReginList = [];
        };
        return (
            <div>
                <Modal title={modalBrowserText} visible={modalBrowserVisible} cancelText={modalBrowserCancelText} okText={modalBrowserOkText} onCancel={this.modalCancel} onOk={this.modalOk} destroyOnClose={true}>
                    <Form autoComplete="off" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} preserve={false} initialValues={{applyRegin: this.applyReginDefaultVal, applyHashRate: applyHashRateDefaultVal}}>
                        {/* 基本信息 */}
                        <div>
                            {/* 选择地区 */}
                            <Item
                                label={<span>选择地区</span>}
                                name="applyRegin"
                            >
                                <Select onChange={this.applyPathChange}>
                                    {
                                        this.applyReginList.map( item => {
                                            return (
                                                <Option key={item} value={item}>{item}</Option>
                                            );
                                        } )
                                    }
                                </Select>
                            </Item>
                            {/* 选择算力 */}
                            {/* <Item
                                label={<span>选择算力</span>}
                                name="applyHashRate"
                            >
                                <Select onChange={this.applyHashRateChange}>
                                    {
                                        applyHashRateList.map( item => {
                                            return (
                                                <Option key={item.value} value={item.value}>{item.name}</Option>
                                            );
                                        } )
                                    }
                                </Select>
                            </Item> */}
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    };
};
