import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter} from 'react-router-dom';


import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import logger from "redux-logger";

import {NEW_LINE, newLine} from './actions';


const index = (state = 0, action) => {
    switch(action.type) {
        default:
        return state;
    }
}


const data = (state = [], action) => {
    switch(action.type) {
        case NEW_LINE:
            return [...state, action.data];
        default:
        return state;
    }
}

const history = (state = [], action) => {
    switch(action.type) {
        default:
        return state;
    }
}


const store = createStore(
    combineReducers({
        data
    }), applyMiddleware(logger)
)

store.dispatch(newLine());
store.dispatch(newLine());
store.dispatch(newLine());

ReactDOM.render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
