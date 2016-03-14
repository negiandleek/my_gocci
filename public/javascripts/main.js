'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware} from 'redux';
import App from './containers/App.react';
import rootReducer from './reducers';

let store = createStore(
	rootReducer,
	applyMiddleware(thunk)
);

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
 		document.getElementById('root')
	)
});
