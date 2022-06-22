import React, { Component } from 'react';

export default class Index4 extends Component {
    state = {
        isShow: false
    };
    render () {
        let { isShow } = this.state;
        let btn;
        if (isShow) btn = <button>显示</button>;
        else btn = <button>隐藏</button>
        return (
            <div>
                { btn }
            </div>
        );
    };
};

