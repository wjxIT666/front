import React, { Component } from 'react';
import { Input } from 'antd';

export default class MyInput extends Component {

    changeInp = (e) => {
        //子组件向父组件传值
        this.props.getInp(e.target.value);
    };

    render () {
        let { inpVal } = this.props;
        return (
            <div>
                <Input value={inpVal} onChange={this.changeInp}></Input>
            </div>
        );
    };
};
