import React, { Component } from 'react';
import './Login.less';
import LogCard from '../../components/Log_Card/Log_Card.jsx';

export default class Login extends Component {
    state = {
        cardWidth: '4rem',
        cardBorder: false,
        cardTitle: '登录'
    };
    render () {
        let { cardWidth, cardBorder, cardTitle } = this.state;
        return (
            <div className="LoginStyle">
                <LogCard {...{cardWidth, cardBorder, cardTitle}}></LogCard>
            </div>
        );
    };
};
