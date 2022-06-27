import React, { Component } from 'react';
import { Button } from 'antd';

export default class X86_Button extends Component {
    btnClick = () => {
        this.props.getBtnValue();
    };
    render () {
        let { applyButtonType, size, applyButtonText, btnDisabled, blockBtn } = this.props;
        return (
            <div>
                <Button type={applyButtonType} size={size} disabled={btnDisabled} block={blockBtn} onClick={this.btnClick}>{applyButtonText}</Button>
            </div>
        );
    };
};
