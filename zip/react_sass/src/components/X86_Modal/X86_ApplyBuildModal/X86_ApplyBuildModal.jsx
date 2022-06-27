import React, { Component } from 'react';
import { Modal } from 'antd';
import Text from '../../Text/Text.jsx';

export default class X86_ApplyBuildModal extends Component {
    TextContent = '分发不可终止，确认分发？';
    modalCancel = () => {
        this.props.modalCancel(false);
    };
    modalOk = () => {
        this.props.modalOk(false);
    };
    render () {
        let { modalBuildText, modalBuildVisible, modalBuildOkText, modalBuildCancelText } = this.props;
        return (
            <div>
                <Modal title={modalBuildText} visible={modalBuildVisible} cancelText={modalBuildCancelText} okText={modalBuildOkText} onCancel={this.modalCancel} onOk={this.modalOk} destroyOnClose={true}>
                    <Text TextContent={this.TextContent}></Text>
                </Modal>
            </div>
        );
    };
};
