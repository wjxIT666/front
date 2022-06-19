import React, { Component } from 'react';
import Text from '../../components/Text/Text.jsx';

export default class Index2 extends Component {
    state = {
        textContent: '构造函数组件'
    };

    render () {
        let { textContent } = this.state;
        return (
            <div>
                <Text textContent={textContent}></Text>
            </div>
        );
    };
};
