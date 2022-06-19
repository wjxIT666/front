import React, { Component } from 'react';

export default class List extends Component {

    btnClick = (schoolName) => {
        this.props.getSchool(schoolName);
    };

    render () {
        let { listArr } = this.props;
        return (
            <div>
                {
                    listArr.map( item => {
                        return (
                            <div key={item.idno}>
                                <h5>{item.name}</h5>
                                <button onClick={this.btnClick.bind(this, item.name)}>选择喜欢的学校</button>
                            </div>
                        );
                    } )
                }
            </div>
        );
    };
};
