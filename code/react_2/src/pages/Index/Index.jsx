import React, { Component } from 'react';
import List from '../../components/List/List.jsx';

export default class Index extends Component {
    state = {
        inpVal1: '小明',
        inpVal2: '小红',
        inpVal3: '小黑'
    };

    render () {
        let { inpVal1, inpVal2, inpVal3 } = this.state;
        return (
            <div>
                <List {...{inpVal1, inpVal2, inpVal3}}></List>
            </div>
        );
    };
};
