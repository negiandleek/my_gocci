'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const {Router,Route,IndexRoute} = require('react-router');

const Main = require('./components/Main.react.js');

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