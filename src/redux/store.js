import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

const defaultState = {
    isLoading: false, isError: false, weather: null
};

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk));

export default store;