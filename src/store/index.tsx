import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';

export const defaultState = {
	quiz: {
		questions: undefined,
		currentQuestion: undefined,
		correct: 0
	}
};

const store = __DEV__
	? createStore(Reducers, defaultState, composeWithDevTools())
	: createStore(Reducers, defaultState);
export default store;

export function withRedux(WrappedComponent: any) {
	return props => (
		<Provider store={store}>
			<WrappedComponent {...props} />
		</Provider>
	);
}
