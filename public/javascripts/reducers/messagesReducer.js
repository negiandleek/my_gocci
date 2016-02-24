import {ADD_MESSAGE} from '../constants/MessagesTypes';

const initialState = [
	{value: 'こんちはっす\nお話しするっす',isMyself: 0},
	{value: '近くのお店', isMyself: 1}
];

function messageReducer(state = initialState, action) {
  	switch (action.type) {
    	case ADD_MESSAGE:
      		return [
      			...state,
      			{
      				value: action.value,
      				isMyself: action.isMyself
      			}
      		]
	    default:
	     	return state
	}
}
module.exports = messageReducer;