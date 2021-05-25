import {addErrorNotification, addSuccessNotification} from "./notifications";

export const backendUrl = "http://localhost:3000";

const parseJson = async response => {
    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
};

const parseError = async error => {
    try {
        let text = await error.text();
        return JSON.parse(text).message;
    } catch (e) {
        return error.message;
    }
};

export const fetchGet = (dispatch, url, onSuccess) => {
    fetch(url)
        .then(response => {
            if (!response.ok) throw response;
            return response;
        })
        .then(parseJson)
        .then(response => {
            onSuccess(response);
        })
        .catch(async error => {
            let message = await parseError(error);
            dispatch(addErrorNotification(message));
        });
};

export const fetchPatchDelete = (dispatch, url, requestOptions, successMessage) => {
    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) throw response;
            return response;
        })
        .then(() => {
            dispatch(addSuccessNotification(successMessage));
        })
        .catch(async error => {
            let message = await parseError(error);
            dispatch(addErrorNotification(message));
        });
};
