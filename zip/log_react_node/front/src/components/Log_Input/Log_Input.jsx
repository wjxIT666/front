import React, { Component } from 'react';
import './Log_Input.less';
import { Input } from 'antd';
const { Password } = Input;

export default class Log_Input extends Component {
    //文本框获取val
    inpChange = (e) => {
        this.props.getInpChange(e.target.value);
    };
    //密码框获取val
    pwdChange = (e) => {
        this.props.getPwdChange(e.target.value);
    };
    render () {
        let { prefix, visibilityToggle } = this.props;
        let showInput;
        if (!visibilityToggle) showInput = <Input prefix={prefix} onChange={this.inpChange}/>;
        else showInput = <Password prefix={prefix} visibilityToggle={visibilityToggle} onChange={this.pwdChange}/>;
        return (
            <div className="InputStyle">
                { showInput }
            </div>
        );
    };
};
