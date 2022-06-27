import React, { Component } from 'react';
import { Synchronizer } from 'live-dragon';

export default class ColonyControl extends Component {
    synchronizer = null;
    id = [];

    colonyControl = () => {
        const selectedRowKeys = JSON.parse(sessionStorage.getItem('selectedRowKeys'));
        const regin = sessionStorage.getItem('regin');
        const config = selectedRowKeys.map( item => {
            return {
                address: `wss://raystream-${regin}.doulong.cn`,
                token: item,
                iceServers: [
                    { urls: `turn:${regin}-gateway.doulong.cn:3478`, username: 'coturn', credential: '123456' },
                    { urls: `turn:${regin}-gateway.doulong.cn:3478`, username: 'coturn', credential: '123456' },
                ],
            }
        });

        this.synchronizer = new Synchronizer(document.body);
        this.id = config.map(({ address, token, iceServers }) => this.synchronizer.createInstance(`${address}/clientWebsocket/${token}`, iceServers));
        this.synchronizer.link(this.id);
    };

    //组件销毁触发
    componentWillUnmount () {
        this.synchronizer.remove(this.id);
    };
    render () {
        return (
            <div>
                {
                    this.colonyControl()
                }
            </div>
        );
    };
};
