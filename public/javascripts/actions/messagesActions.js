import * as types from '../constants/MessagesTypes';

export function addMessage(value,isMyself) {
	return {type: types.ADD_MESSAGE,value,isMyself}
}