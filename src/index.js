import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter} from "react-router-dom";
import {saveState} from "./localStorage";

store.subscribe(() => {
    let state = store.getState();
    saveState({
        sessionReducer: {
            token: state.sessionReducer.token
        },
        userReducer: {
            username: state.userReducer.username
        }
    });
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
