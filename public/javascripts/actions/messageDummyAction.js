import * as types from '../constants/MessageDummyTypes';

export function setSizeHeight(diffHeight) {
	return { type: types.SET_SIZE_HEIGHT,diffHeight}
}