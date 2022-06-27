import React, { Component } from 'react';
import { Input } from 'antd';

export default class X86_Input extends Component {
    inpRef = React.createRef();
    inputChange = (e) => {
        this.props.getInputValue(e.target.value);
    };
    inputBlur = () => {
        this.props.getInputClear(this.inpRef);
    };
    render () {
        let { inputSize, inpPlaceholder, inpPrefix, inpDisabled, inpVal } = this.props;
        return (
            <div>
                <Input size={inputSize} placeholder={inpPlaceholder} prefix={inpPrefix} disabled={inpDisabled} value={inpVal} onChange={this.inputChange} onBlur={this.inputBlur} ref={this.inpRef}/>
            </div>
        );
    };
};
