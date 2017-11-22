import { CHANGE_INDEX,CHANGE_FRIENDLINK } from './actionTypes';


export const getIndexAction = (value) => ({
	type: CHANGE_INDEX,
	value: value
})
export const getFriendLinkAction = (value) => ({
	type: CHANGE_FRIENDLINK,
	value: value
})
