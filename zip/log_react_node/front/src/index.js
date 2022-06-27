import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';
import './css/reset.css';
import './rem/rem.js';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
