import React, { Component } from 'react';
import { Modal, Form, Input, Tag, message } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';
import { isEmpty } from '../../../js/util.js';
import { createProj } from '../../../request/api.js';
const { Item } = Form;

export default class Log_SetModal extends Component {
    state = {
        tags: [],
        inputTagVisible: false,
        inputTagValue: '',
        inputName: ''
    };
    //确认触发
    handleOk = async () => {
        let { tags, inputName } = this.state;
        //非空校验
        let inputNameRule = isEmpty(inputName, '项目名称不能为空');
        if (!inputNameRule) return false;
        //传递数据
        let data = { tags, inputName, user: sessionStorage.getItem('u_name') };
        //创建项目接口
        let createProjRes = await createProj(data);
        let { code, msg } = createProjRes;
        if (code === 0) {
            message.success(msg);
            this.props.getSetOk(false);
            //清空数据
            this.setState({
                tags: [],
                inputTagVisible: false,
                inputTagValue: '',
                inputName: ''
            });
        } else if (code === 9) {
            message.error(msg);
        }
    };
    //取消触发
    handleCancel = () => {
        this.setState({
            tags: [],
            inputTagVisible: false,
            inputTagValue: '',
            inputName: ''
        });
        this.props.getSetCancel(false);
    };
    //项目名称
    inputNameChange = (e) => {
        this.setState({
            inputName: e.target.value
        });
    };
    //标签关闭
    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputTagVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputTagValue: e.target.value });
    };

    handleInputConfirm = () => {
        const { inputTagValue } = this.state;
        let { tags } = this.state;
        if (inputTagValue && tags.indexOf(inputTagValue) === -1) {
            tags = [...tags, inputTagValue];
        }
        this.setState({
            tags,
            inputTagVisible: false,
            inputTagValue: ''
        });
    };

    saveInputRef = input => {
        this.input = input;
    };
    forMap = tag => {
        const tagElem = (
            <Tag
                style={{ marginBottom: '10px' }}
                color="processing"
                closable
                onClose={e => {
                    e.preventDefault();
                    this.handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
                {tagElem}
            </span>
        );
    };
    render() {
        let { SetModalTitle, SetModalVisible } = this.props;
        const { tags, inputTagVisible, inputTagValue, inputName } = this.state;
        const tagChild = tags.map(this.forMap);
        return (
            <div>
                <Modal title={SetModalTitle} visible={SetModalVisible} onOk={this.handleOk} okText="确认" onCancel={this.handleCancel} cancelText="取消">
                    {/* 表单 */}
                    <Form labelCol={{ span: 4 }}>
                        {/* 项目名称 */}
                        <Item label="项目名称">
                            <Input value={inputName} onChange={this.inputNameChange}></Input>
                        </Item>
                        {/* 标签 */}
                        <Item label="标签">
                            <div>
                                <TweenOneGroup
                                    enter={{
                                        scale: 0.8,
                                        opacity: 0,
                                        type: 'from',
                                        duration: 100,
                                    }}
                                    onEnd={e => {
                                        if (e.type === 'appear' || e.type === 'enter') {
                                            e.target.style = 'display: inline-block';
                                        }
                                    }}
                                    leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                                    appear={false}
                                >
                                    {tagChild}
                                </TweenOneGroup>
                            </div>
                            {inputTagVisible && (
                                <Input
                                    ref={this.saveInputRef}
                                    type="text"
                                    size="small"
                                    style={{ width: 78 }}
                                    value={inputTagValue}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleInputConfirm}
                                    onPressEnter={this.handleInputConfirm}
                                />
                            )}
                            {!inputTagVisible && (
                                <Tag onClick={this.showInput}>
                                    <PlusOutlined /> 添加标签
                                </Tag>
                            )}
                        </Item>
                    </Form>
                </Modal>
            </div>
        );
    };
};
