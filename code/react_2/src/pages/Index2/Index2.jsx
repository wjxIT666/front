import React, { Component } from 'react';

export default class Index2 extends Component {

    btnClick = () => {
        this.props.history.push({
            pathname: '/index3',
            state: { id: 'index2' }
        });
    };

    render () {
        return (
            <div>
                <button onClick={this.btnClick}>跳转</button>
            </div>
        );
    };
};
