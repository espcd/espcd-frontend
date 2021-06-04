import {addErrorNotification, addSuccessNotification} from "./notifications";

const scheme = process.env.REACT_APP_BACKEND_SECURE === "true" ? "https" : "http";
export const backendUrl = `${scheme}://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`;

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

const addParamsToUrl = (getState, url) => {
    let api_key = getState().sessionReducer.token;
    if (api_key) {
        url = `${url}?api_key=${api_key}`
    }
    return url;
}

export const fetchGet = (dispatch, getState, url, onSuccess) => {
    url = addParamsToUrl(getState, url);
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

export const fetchPostPatchDelete = (dispatch, getState, url, requestOptions, successMessage) => {
    url = addParamsToUrl(getState, url);
    return new Promise((resolve) => {
        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) throw response;
                return response;
            })
            .then(parseJson)
            .then(response => {
                dispatch(addSuccessNotification(successMessage));
                resolve(response);
            })
            .catch(async error => {
                let message = await parseError(error);
                dispatch(addErrorNotification(message));
            });
    });
};
