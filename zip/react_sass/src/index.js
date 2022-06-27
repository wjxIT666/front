import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';
import './less/index.less';
import './js/rem.js';
import store from './redux/store.js';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

//redux重新渲染视图
store.subscribe( () => {
    ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, document.getElementById('root'));
} );
