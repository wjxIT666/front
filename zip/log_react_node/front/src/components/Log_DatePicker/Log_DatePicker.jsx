import React, { Component } from 'react';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export default class Log_DatePicker extends Component {
    datePicker = (date, dateString) => {
        this.props.getDateTime(date, dateString);
    };
    render () {
        return (
            <div>
                <RangePicker onChange={this.datePicker} format="YYYY-MM-DD HH:mm:ss"/>
            </div>
        );
    };
};
