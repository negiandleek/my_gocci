import * as types from '../constants/MessagesTypes';

const initialState = [
	{value: 'こんちはっす\nお話しするっす',isMyself: 0},
	{value: '近くのお店', isMyself: 1}
];

function messageReducer(
    state = initialState, 
    action,
    isFetching = true;
) {
  	switch (action.type) {
    	case types.REQUEST_TO_ADD_MESSAGE:
      		return Object.assign({},state,{
                isFetching: true
            });
        case types.REQUEST_TO_ADD_MESSAGE:
            return Object.assign({},state,{
                isFetching: true,
                items: action.posts
            });
	    default:
	     	return state
	}
}
module.exports = messageReducer;