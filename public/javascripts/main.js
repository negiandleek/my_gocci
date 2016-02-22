'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute} from 'react-router';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import App from './containers/App.react';
import mygocciApp from './reducers';

let store = createStore(mygocciApp);

document.addEventListener('DOMContentLoaded', () => {
	ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>,
 		document.getElementById('root')
	)
});
