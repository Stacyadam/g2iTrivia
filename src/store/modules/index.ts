import { combineReducers } from 'redux';
import quiz from './quiz';
import { defaultState } from '../index';

const appReducer = combineReducers({
	quiz
});

export default (state: any, action: any) => {
	if (action.type === 'RESET') {
		state = defaultState;
	}
	return appReducer(state, action);
};
