import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './pages/Index/Index.jsx';
import Index2 from './pages/Index2/Index2.jsx';
import Index3 from './pages/Index3/Index3.jsx';
import Index4 from './pages/Index4/Index4.jsx';
import Index5 from './pages/Index5/Index5.jsx';

export default class App extends Component {
	render () {
		return (
			<div>
				<Switch>
					<Route path="/index" component={Index}></Route>
					<Route path="/index2" component={Index2}></Route>
					<Route path="/index3" component={Index3}></Route>
					<Route path="/index4" component={Index4}></Route>
					<Route path="/index5" component={Index5}></Route>
				</Switch>
			</div>
		);
	};
};
