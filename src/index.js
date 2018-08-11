import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import promiseMiddleware from "redux-promise-middleware";

import {
    NEW_LINE,
    REMOVE_LINE,
    FIELD_UPDATE,
    URL_UPDATE,
    METHOD_UPDATE,
    SUBMIT_REQUEST
} from "./actions";

import { newLine, methodUpdate, urlUpdate } from "./actions";

const data = (state = [], action) => {
    switch (action.type) {
        case NEW_LINE:
            return [...state, action.data];
        case REMOVE_LINE:
            return state.filter(v => v.id !== action.id);
        case FIELD_UPDATE:
            let index = state.findIndex(e => e.id === action.data.id);
            return [
                ...state.slice(0, index),
                {
                    ...state[index],
                    ...action.data
                },
                ...state.slice(index + 1)
            ];
        default:
            return state;
    }
};

const response = (state = { fetching: false, data: {} }, action) => {
    switch (action.type) {
        case SUBMIT_REQUEST + "_PENDING":
            return {
                ...state,
                fetching: true
            };
        case SUBMIT_REQUEST + "_FULFILLED":
            return {
                fetching: false,
                data: action.payload
            };
        default:
            return state;
    }
};

const store = createStore(
    combineReducers({
        data,
        response,
        url: (state = "", action) => {
            if (action.type === URL_UPDATE) {
                return action.url;
            }
            return state;
        },
        method: (state = "GET", action) => {
            if (action.type === METHOD_UPDATE) {
                return action.method;
            }
            return state;
        }
    }),
    applyMiddleware(promiseMiddleware(), logger)
);

let localStateString = localStorage.getItem("state");
if (!localStateString) {
    store.dispatch(newLine());
    store.dispatch(newLine());
    store.dispatch(newLine());
} else {
    let { method, data, url } = JSON.parse(localStateString);

    store.dispatch(methodUpdate(method));
    store.dispatch(urlUpdate(url));

    data.map(v => {
        let { active, prop, value } = v;
        store.dispatch(
            newLine({
                active,
                prop,
                value
            })
        );
    });
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();
