import * as types from '../constants/MessagesTypes';

export function addMessage(value,isMyself) {
	return {
		type: types.REQUEST_TO_ADD_MESSAGE,
		value,
		isMyself
	}
}

export function receive_to_add_message (json) {
	return {
		type: types.RECEIVE_TO_ADD_MESSAGE,
		posts: json.data
	}
}