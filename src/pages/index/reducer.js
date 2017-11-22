import { CHANGE_INDEX,CHANGE_FRIENDLINK } from './actionTypes';

const defaultState = {
		list: [],
		linklist: []
}

export default (state = defaultState, action) => {
	if (action.type === CHANGE_INDEX) {
		const newState = Object.assign({}, state);
		newState.list = action.value;
		return newState;
	}
	if (action.type === CHANGE_FRIENDLINK) {
		const newState = Object.assign({}, state);
		newState.linklist = action.value;
		return newState;
	}
	
	return state;
}
