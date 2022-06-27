import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import { isEmpty, lengthRule } from '../../../js/rules.js';
const { Item } = Form;

export default class X86_ApplyEditModal extends Component {
    state = {
        applyNameVal: ''
    };
    modalCancel = () => {
        this.props.modalCancel(false);
        //清空数据
        this.setState({
            applyNameVal: ''
        });
    };
    modalOk = () => {
        let { applyNameVal } = this.state;
        let isEmptyError = isEmpty(applyNameVal, '应用名称不能为空');
        let lengthRuleError = lengthRule(applyNameVal, 40, '长度不能超过40字符');
        if (!isEmptyError || !lengthRuleError) return false;
        console.log(applyNameVal);
    };
    applyNameVal = (e) => {
        this.setState({
            applyNameVal: e.target.value
        });
    };
    render () {
        let { modalEditText, modalEditVisible, modalEditOkText, modalEditCancelText } = this.props;
        return (
            <div>
                <Modal title={modalEditText} visible={modalEditVisible} cancelText={modalEditCancelText} okText={modalEditOkText} onCancel={this.modalCancel} onOk={this.modalOk} destroyOnClose={true}>
                    <Form autoComplete="off" labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} preserve={false}>
                        {/* 基本信息 */}
                        <div>
                            {/* 应用名称 */}
                            <Item
                                label={<span><span style={{color: 'red'}}>*</span> 应用名称</span>}
                                name="applyName"
                            >
                                <Input onChange={this.applyNameVal}/>
                            </Item>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    };
};
