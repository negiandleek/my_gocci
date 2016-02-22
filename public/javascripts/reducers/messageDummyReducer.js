import {SET_SIZE_HEIGHT} from '../constants/MessageDummyTypes';

const _initialState = [
	{value: 'こんちはっす\nお話しするっす',isMyself: 0},
	{value: '近くのお店', isMyself: 1}
];

const initialState = {
	display: '',
	height: ''
};

function mainReducer(state = initialState, action) {
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
module.exports = mainReducer;