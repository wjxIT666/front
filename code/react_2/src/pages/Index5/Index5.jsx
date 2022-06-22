import React, { Component } from 'react';

export default class Index5 extends Component {
    componentDidMount () {
        console.log(this.getInpRef);
    };
    render () {
        return (
            <div>
                <input type="text" ref={inp => this.getInpRef = inp} />
            </div>
        );
    };
};
