import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { checkDetailAdd } from '../../../../request/api.js';
import { isEmpty } from '../../../../js/util.js';
const { Item } = Form;

export default class CheckDetailModal extends Component {
    state = {
        name: '',
        address: '',
        url: '',
        port: '',
        path: ''
    };
    //确认
    handleOk = async () => {
        let { name, address, url, port, path } = this.state;
        //非空校验
        let nameRule = isEmpty(name, '请填写业务名称');
        let addressRule = isEmpty(address, '请填写服务地址');
        let urlRule = isEmpty(url, '请填写服务域名');
        let portRule = isEmpty(port, '请填写服务端口');
        let pathRule = isEmpty(path, '请填写目录');
        if (!nameRule || !addressRule || !urlRule || !portRule || !pathRule) return false;
        let data = { name, address, url, port, path, id: this.props.id };
        let checkDetailAddRes = await checkDetailAdd(data);
        let { code, msg } = checkDetailAddRes;
        if (code === 0) {
            message.success(msg);
            this.setState({
                name: '',
                address: '',
                url: '',
                port: '',
                path: ''
            });
            this.props.handleOk(false);
        } else if (code === 9) {
            message.error(msg);
        };
    };
    //取消
    handleCancel = () => {
        this.setState({
            name: '',
            address: '',
            url: '',
            port: '',
            path: ''
        });
        this.props.handleCancel(false);
    };
    //修改名称
    changeName = (e) => {
        this.setState({
            name: e.target.value
        });
    };
    //修改地址
    changeAddress = (e) => {
        this.setState({
            address: e.target.value
        });
    };
    //修改域名
    changeUrl = (e) => {
        this.setState({
            url: e.target.value
        });
    };
    //修改端口
    changePort = (e) => {
        this.setState({
            port: e.target.value
        });
    };
    //修改目录
    changePath = (e) => {
        this.setState({
            path: e.target.value
        });
    };
    render () {
        let { name, address, url, port, path } = this.state;
        let { modalTitle, isModalVisible, okText, cancelText } = this.props;
        return (
            <div>
                <Modal title={modalTitle} visible={isModalVisible} onOk={this.handleOk} okText={okText} onCancel={this.handleCancel} cancelText={cancelText}>
                    <Form labelCol={{ span: 4 }}>
                        {/* 业务名称 */}
                        <Item label="业务名称">
                            <Input value={name} placeholder="请填写业务名称" onChange={this.changeName}></Input>
                        </Item>
                        {/* 服务地址 */}
                        <Item label="服务地址">
                            <Input value={address} placeholder="请填写服务地址" onChange={this.changeAddress}></Input>
                        </Item>
                        {/* 服务域名 */}
                        <Item label="服务域名">
                            <Input value={url} placeholder="请填写服务域名" onChange={this.changeUrl}></Input>
                        </Item>
                        {/* 服务端口 */}
                        <Item label="服务端口">
                            <Input value={port} placeholder="请填写服务端口" onChange={this.changePort}></Input>
                        </Item>
                        {/* 目录 */}
                        <Item label="目录">
                            <Input value={path} placeholder="请填写目录" onChange={this.changePath}></Input>
                        </Item>
                    </Form>
                </Modal>
            </div>
        );
    };
};
