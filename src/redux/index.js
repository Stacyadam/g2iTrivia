import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from './modules';
import { composeWithDevTools } from 'redux-devtools-extension';

const defaultState = {
  quiz: null
};

const store = __DEV__
  ? createStore(Reducers, defaultState, composeWithDevTools())
  : createStore(Reducers, defaultState);
export default store;

export function withRedux(WrappedComponent) {
  return props => (
    <Provider store={store}>
      <WrappedComponent {...props} />
    </Provider>
  );
}
