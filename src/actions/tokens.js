import {backendUrl, fetchGet, fetchPostPatchDelete} from "./common";

export const ADD_TOKENS = "ADD_TOKENS";
export const ADD_TOKEN = "ADD_TOKEN";
export const EDIT_TOKEN = "EDIT_TOKEN";
export const DELETE_TOKEN = "DELETE_TOKEN";
export const SET_TOKEN_QUERY = "SET_TOKEN_QUERY";
export const SET_TOKEN_SORT = "SET_TOKEN_SORT";

const baseUrl = `${backendUrl}/tokens`;

export const addTokensAction = (tokens) => ({
    type: ADD_TOKENS,
    data: tokens,
});

export const addTokenAction = (token) => ({
    type: ADD_TOKEN,
    data: token,
});

export const editTokenAction = (token) => ({
    type: EDIT_TOKEN,
    data: token,
});

export const deleteTokenAction = (tokenId) => ({
    type: DELETE_TOKEN,
    data: tokenId,
});

export const dispatchAddToken = (token) => async dispatch => dispatch(addTokenAction(token));
export const dispatchEditToken = (token) => async dispatch => dispatch(editTokenAction(token));
export const dispatchDeleteToken = (tokenId) => async dispatch => dispatch(deleteTokenAction(tokenId));

export const getTokens = () => async (dispatch, getState) => {
    return fetchGet(
        dispatch,
        getState,
        baseUrl
    ).then(response => dispatch(addTokensAction(response)));
};

export const createToken = (payload) => async (dispatch, getState) => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };
    return fetchPostPatchDelete(
        dispatch,
        getState,
        baseUrl,
        requestOptions,
        "Token created"
    );
};

export const editToken = (tokenId, payload) => async (dispatch, getState) => {
    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };
    return fetchPostPatchDelete(
        dispatch,
        getState,
        `${baseUrl}/${tokenId}`,
        requestOptions,
        "Token edited"
    );
};

export const deleteToken = (tokenId) => async (dispatch, getState) => {
    const requestOptions = {
        method: "DELETE"
    };
    return fetchPostPatchDelete(
        dispatch,
        getState,
        `${baseUrl}/${tokenId}`,
        requestOptions,
        "Token deleted"
    );
};

export const setTokenQuery = (query) => async dispatch => {
    dispatch({
        type: SET_TOKEN_QUERY,
        data: query,
    });
};

export const setTokenSort = (sortBy, sortOrder) => async dispatch => {
    dispatch({
        type: SET_TOKEN_SORT,
        data: {
            sortBy,
            sortOrder
        },
    });
};
