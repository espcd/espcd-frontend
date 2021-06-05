import {backendUrl, fetchPostPatchDelete} from "./common";

export const ADD_USER = "ADD_USER";

const baseUrl = `${backendUrl}/user`;

export const addUserAction = (username) => ({
    type: ADD_USER,
    data: username
});

export const editUser = (password) => async (dispatch, getState) => {
    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({password})
    };
    return fetchPostPatchDelete(
        dispatch,
        getState,
        baseUrl,
        requestOptions,
        "User edited"
    );
};
