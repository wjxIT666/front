import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './page/Home/Home.jsx';
import Login from './page/Login/Login.jsx';
import AuthRoute from './router/authRouter.js';

export default class App extends Component {
	render () {
		return (
			<div>
				{/* 配置路由 */}
				<Switch>
					{/* 主页路由 */}
                    <AuthRoute path="/home" component={Home}/>
                    {/* 登陆页面 */}
                    <Route path="/" component={Login}></Route>
                    {/* 重定向 */}
                    <Redirect to="/"></Redirect>
				</Switch>
			</div>
		);
	};
};
