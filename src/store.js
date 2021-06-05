import {applyMiddleware, createStore} from "redux";
import combinedReducers from "./reducers/reducers";
import thunk from "redux-thunk";
import {loadState} from "./localStorage";

const store = createStore(
    combinedReducers,
    loadState(),
    applyMiddleware(thunk)
);
export default store;
