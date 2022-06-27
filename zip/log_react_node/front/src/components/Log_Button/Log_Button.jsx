import React, { Component } from 'react';
import { Button } from 'antd';

export default class Log_Button extends Component {
    btnClick = () => {
        this.props.getBtnClick();
    };
    render () {
        let { btnType, btnBlock, btnText } = this.props;
        return (
            <div>
                <Button type={btnType} block={btnBlock} onClick={this.btnClick}>{btnText}</Button>
            </div>
        );
    };
};
