import React, { Component } from 'react';
import List from '../../components/List/List.jsx';

export default class Index4 extends Component {
    state = {
        listArr: [
            {
                idno: '0001',
                name: '北大'
            },
            {
                idno: '0002',
                name: '清华'
            }
        ]
    };

    getSchool = (name) => {
        console.log('父组件接收子组件的传值', name);
    };

    render () {
        let { listArr } = this.state;
        return (
            <div>
                <List listArr={listArr} getSchool={this.getSchool}></List>
            </div>
        );
    };
};
