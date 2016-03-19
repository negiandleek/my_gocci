import * as types from '../constants/MessagesTypes';

const initialState = {
    message:[
        {
            value: 'こんちはっす\nお話しするっす',
            is_myself: false,
            is_invalidate: false
        },
        {
            value: '近くのお店', 
            is_myself: true,
            is_invalidate: false
        }
    ],
    isFetching: false
};

function message_reducer(state = initialState, action) {
  	switch (action.type) {
    	case types.REQUEST_TO_ADD_MESSAGE:
      		return Object.assign({},state,{
                message: (() => {
                    return state.message.concat({
                        value: action.message,
                        is_myself: true,
                        is_invalidate: true
                    });
                })(),
                isFetching: true,
            });
        case types.RECEIVE_TO_ADD_MESSAGE:
            return Object.assign({},state,{
                message: (()=>{
                    let i = state.message.length - 1;
                    state.message[i].is_invalidate = false;
                    if(typeof action.message !== "undefined"){
                        return state.message.concat({
                            value: action.message,
                            is_myself: false,
                            is_invalidate: false
                        });
                    }else{
                        return state.message;
                    }
                })(),
                isFetching: false,
            });
	    default:
	     	return state;
	}
}

module.exports = message_reducer;