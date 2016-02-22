'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import Main from './components/Main.react';

const Routes = (
	<Route>
		<Route path='/' component={Main} />
	</Route>
);
 
document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Router>{Routes}</Router>,
		document.getElementById('root')
	);
});