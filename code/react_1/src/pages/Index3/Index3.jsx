import React, { Component } from 'react';
import MyInput from '../../components/MyInput/MyInput.jsx';

export default class Index3 extends Component {
    state = {
        inpVal: '小明'
    };

    getInp = (value) => {
        //父组件接收子组件的传值
        console.log('父组件接收子组件的传值', value);
        this.setState({
            inpVal: value
        });
    };

    render () {
        let { inpVal } = this.state;
        return (
            <div>
                <MyInput inpVal={inpVal} getInp={this.getInp}></MyInput>
            </div>
        );
    };
};
