import React, { Component } from 'react';
import { Modal, Form, Upload, Select, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { isEmpty } from '../../../js/rules.js';
import { AccessId, Channel, Version, API } from '../../../request/config.js';
import { getSign } from '../../../request/sign.js';
import { updateGame } from '../../../request/api.js';
import axios from 'axios';
const { Item } = Form;
const { Option } = Select;

export default class X86_ApplyUpdateModal extends Component {
    searchPlaceholder = '请先上传应用后选择';
    signRes = '';
    state = {
        applyPath: '',
        fileList: [],
        applyPathList: [],
        resourceCode: '',
        btnDisabled: false
    };
    modalCancel = () => {
        this.props.modalUpdateCancel(false);
        //清空数据
        this.setState({
            applyPath: '',
            applyPathList: [],
            resourceCode: '',
        });
    };
    modalOk = async () => {
        let { applyPath, resourceCode } = this.state;
        let isEmptyapplyPath = isEmpty(applyPath, '应用路径不能为空');
        if (!isEmptyapplyPath) return false;
        let { appCode } = this.props;
        let data = {packageName: applyPath, resourceCode: resourceCode, appCode };
        //调用新增游戏接口
        let updateGameRes = await updateGame(data);
        console.log(updateGameRes)
        if (updateGameRes.result === true) {
            message.success('更新成功');
            //清空数据
            this.setState({
                applyPath: '',
                applyPathList: [],
                resourceCode: '',
            });
            this.props.modalUpdateOk(false);
            this.props.gameApplySuucess();
        } else if (updateGameRes.result === false) {
            message.error('更新失败');
        };
    };
    searchChange = (path) => {
        this.setState({
            applyPath: path
        });
    };

    //图片上传之前
    handlerBefore = (info) => {
        console.log(info, '图片上传之前');
        //上传文件名不得超过60个字符
        if (info.name.length > 60) {
            message.error('上传文件名长度不能超过60字符');
            return false;
        };
        //上传文件大小不得超过30G
        let fileSize = info.size / 1024 / 1024 / 1024;
        if (fileSize > 30) {
            message.error('文件大小不超过30G，超过30G需要联系人员');
            return false;
        };
        return true;
    };

    handleChange = (info) => {
        if (info.file.status === 'done') {
            message.success('上传成功');
            this.setState({btnDisabled: false});
        } else if (info.file.status === 'error') {
            message.error('上传失败');
            this.setState({btnDisabled: false});
        };
    };

    onImgFilesChange = (info) => {
        console.log(info, 'info');
        this.uploadImg(info);
    };

    uploadImg = async (info) => {
        let Time = parseInt(Date.now() / 1000);
        let Nonce = parseInt(Math.random()*(999999-1)+1);
        let signRes = await getSign('', '/raystream/open/app/upload/win', '""', Nonce, Time);
        let formData = new FormData();
        formData.append('app', info.file);
        this.setState({btnDisabled: true});
        await axios({
            method: 'POST',
            url: `${API}/raystream/open/app/upload/win`,
            headers: {
                region: '""',
                accessId: AccessId,
                channel: Channel,
                version: Version,
                nonce: Nonce,
                timestamp: Time,
                signature: signRes,
                'content-Type': 'multipart/form-data'
            }, 
            data: formData,
            onUploadProgress: (data) => {
                let { total, loaded } = data;
                let percent = parseInt(loaded / total * 100) > 99 ? 99 : parseInt(loaded / total * 100);
                info.onProgress({percent}, info.file);
            }
        }).then( res => {
            res = res.data;
            if (res.result === true) {
                //解决进度条一直刷新的问题
                console.log(res);
                this.setState({
                    applyPathList: [...res.data.exes],
                    resourceCode: res.data.resourceCode
                }); 
                info.onProgress({percent: 100}, info.file);
                setTimeout(() => { info.onSuccess() }); 
            } else if (res.result === false) {
                //解决进度条一直刷新的问题
                setTimeout(() => { info.onError() }); 
            };
        } );
    };

    render () {
        let { applyPathList, btnDisabled } = this.state;
        let { modalUpdateText, modalUpdateVisible, modalUpdateOkText, modalUpdateCancelText } = this.props;
        const UploadProps = {
            name: 'app',
            maxCount: 1,
            multiple: false,
            accept: '.zip',
            customRequest: this.onImgFilesChange.bind(this),
            beforeUpload: this.handlerBefore.bind(this), 
            onChange: this.handleChange.bind(this),
            onRemove: () => { this.setState({btnDisabled: false}) },
            progress: {
                strokeColor: {
                  '0%': '#108ee9',
                  '100%': '#87d068',
                },
                strokeWidth: 3,
                format: percent => `${parseFloat(percent.toFixed(2))}%`,
            }
        };
        const normFile = (e) => { 
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };
        return (
            <div>
                <Modal title={modalUpdateText} visible={modalUpdateVisible} cancelText={modalUpdateCancelText} okText={modalUpdateOkText} onCancel={this.modalCancel} onOk={this.modalOk} destroyOnClose={true}>
                    <Form autoComplete="off" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} preserve={false}>
                        {/* 基本信息 */}
                        <div>
                            {/* 应用文件 */}
                            <Item
                                label={<span><span style={{color: 'red'}}>*</span> 应用文件</span>}
                                name="applyFile"
                                valuePropName="fileList" 
	                            getValueFromEvent={normFile} 
                            >
                                <Upload {...UploadProps}>
                                    <Button disabled={btnDisabled} icon={<UploadOutlined />}>上传</Button>
                                </Upload>
                            </Item>
                            {/* 应用路径 */}
                            <Item
                                label={<span><span style={{color: 'red'}}>*</span> 应用路径</span>}
                                name="applyPath"
                            >
                                <Select placeholder={this.searchPlaceholder} onChange={this.searchChange}>
                                    {
                                        applyPathList.map( item => {
                                            return (
                                                <Option key={item} value={item}>{item}</Option>
                                            );
                                        } )
                                    }
                                </Select>
                            </Item>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    };
};
