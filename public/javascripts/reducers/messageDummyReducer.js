import {SET_SIZE_HEIGHT} from '../constants/MessageDummyTypes';

const initialState = {
	display: '',
	height: ''
};

function messageDummyReducer(state = initialState, action) {
  	switch (action.type) {
    	case SET_SIZE_HEIGHT:
      		return {
      			display: action.diffHeight ? 'block' : 'none',
				height: action.diffHeight
			}
	    default:
	     	return state
	}
}
module.exports = messageDummyReducer;