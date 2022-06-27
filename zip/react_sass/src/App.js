import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import ColonyControl from './pages/ColonyControl/ColonyControl.jsx';
import Login from './pages/Login/Login.jsx';
import AuthRoute from './router/authRouter.js';

export default class App extends Component {
	render () {
		return (
			<div>
				<Switch>
					{/* 主页路由 */}
					<AuthRoute path="/home" component={Home}/>
					{/* 群控路由 */}
					<AuthRoute path="/colonyControl" component={ColonyControl}/>
					{/* 登陆页面 */}
					<Route path="/" component={Login}></Route>
					{/* 重定向 */}
					<Redirect to="/"></Redirect>
				</Switch>
			</div>
		);
	};
};
