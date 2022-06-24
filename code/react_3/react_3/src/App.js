import React, { Component } from 'react';
import { sendToken } from './store/action.js';
import store from './store/store.js';

export default class App extends Component {
	
	btnClick = () => {
		let token = '000000';
		store.dispatch(sendToken(token));
	};

	render () {
		return (
			<div>
				<button onClick={this.btnClick}>按钮</button>
				{ store.getState() }
			</div>
		);
	};
};
