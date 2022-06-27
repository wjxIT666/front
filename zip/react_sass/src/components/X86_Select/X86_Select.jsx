import React, { Component } from 'react';
import { Select } from 'antd';
const { Option } = Select;

export default class X86_Select extends Component {
    handleChange = (value) => {
        this.props.getSelectValue(value);
    };
    render () {
        let { applySelectWidth, applyStatusVal, applyStatusList } = this.props;
        return (
            <div>
                <Select defaultValue={applyStatusVal} onChange={this.handleChange} onBlur={this.handleBlur} style={{width: applySelectWidth}}>
                    { 
                        applyStatusList.map( item => {
                            return (
                                <Option key={item.code} value={item.code}>{item.name}</Option>
                            );
                        } )
                    }
                </Select>
            </div>
        );
    };
};
