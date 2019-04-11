import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

import thunkMiddleware from 'redux-thunk';
import DevTools from './DevTools';
import { actionTypes } from './actions';

const createReducer = (initialState, actionHandlers) => {
    return (state = initialState, action) => {
        const reduceFn = actionHandlers[action.type];
        if (!reduceFn) {
            return state;
        }
        return {
            ...state,
            ...reduceFn(state, action)
        };
    };
};

const rootReducer = {
    increments: createReducer({
        increment: 0
    }, {
        [actionTypes.INCREMENT]: (state) => ({
            ...state,
            increment: state.increment + 1
        })
    })
};

export default function configureStore(preloadedState = {}) {
    const middlewares = [thunkMiddleware];
    const enhancers = [applyMiddleware(...middlewares), DevTools.instrument()];

    const store = createStore(
        combineReducers(rootReducer),
        preloadedState,
        compose(...enhancers)
    );
    return store;
}
