import {backendUrl, fetchPostPatchDelete} from "./common";

export const SET_TOKEN = "SET_TOKEN";

const baseUrl = `${backendUrl}/session`;

export const setTokenAction = (token) => ({
    type: SET_TOKEN,
    data: token,
});

export const deleteTokenAction = () => ({
    type: SET_TOKEN,
    data: ""
});

export const createSession = (username, password) => async (dispatch, getState) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    };
    return fetchPostPatchDelete(
        dispatch,
        getState,
        baseUrl,
        requestOptions,
        "Login successful"
    ).then(response => dispatch(setTokenAction(response.token)));
};

export const deleteSession = () => async (dispatch, getState) => {
    const requestOptions = {
        method: "DELETE"
    };
    return fetchPostPatchDelete(
        dispatch,
        getState,
        baseUrl,
        requestOptions,
        "Logout successful"
    ).then(() => dispatch(deleteTokenAction()));
};
