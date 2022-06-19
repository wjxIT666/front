import React, { Component } from 'react';
import axios from 'axios';

export default class Index5 extends Component {

    componentDidMount () {
        axios({
            method: 'GET',
            urk: '/api/getRouter'
        }).then( res => {
            console.log(res.data);
        } );
    };

    render () {
        return (
            <div>

            </div>
        );
    };
};
