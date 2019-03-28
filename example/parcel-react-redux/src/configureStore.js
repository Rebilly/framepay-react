import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import thunkMiddleware from 'redux-thunk';
import DevTools from './DevTools';
import { actionTypes } from './actions';

const createReducer = (initialState, actionHandlers) => {
  return (state = initialState, action) => {
    const reduceFn = actionHandlers[action.type];
    if (!reduceFn) return state;
    return {
      ...state,
      ...reduceFn(state, action),
    };
  };
};

const rootReducer = {
  increments: createReducer({
    increment_1: 0,
    increment_2: 0,
    increment_3: 0,
    increment_4: 0,
  }, {
    [actionTypes.INCREMENT_1]: (state) => ({
      ...state,
      increment_1: state.increment_1 + 1,
    }),
  }),
};

export default function configureStore(preloadedState = {}) {
  const middlewares = [thunkMiddleware];
  const enhancers = [applyMiddleware(...middlewares), DevTools.instrument()];

  const store = createStore(
    combineReducers(rootReducer),
    preloadedState,
    compose(...enhancers),
  );
  return store;
}
