import {combineReducers} from 'redux'
import messageDummyReducer from './messageDummyReducer';
import messageReducer from './messagesReducer';

const rootReducer = combineReducers({
	messageDummyReducer,
	messageReducer
})

export default rootReducer;