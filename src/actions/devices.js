import {backendUrl, parseError, parseJson} from "./common";
import {addErrorNotification, addSuccessNotification} from "./notifications";

export const ADD_DEVICES = "ADD_DEVICES";
export const ADD_DEVICE = "ADD_DEVICE";
export const EDIT_DEVICE = "EDIT_DEVICE";
export const DELETE_DEVICE = "DELETE_DEVICE";
export const SET_DEVICE_QUERY = "SET_DEVICE_QUERY";
export const SET_DEVICE_SORT = "SET_DEVICE_SORT";

const baseUrl = `${backendUrl}/devices`;

export const addDevicesAction = (devices) => ({
    type: ADD_DEVICES,
    data: devices,
});

export const addDeviceAction = (device) => ({
    type: ADD_DEVICE,
    data: device,
});

export const editDeviceAction = (device) => ({
    type: EDIT_DEVICE,
    data: device,
});

export const deleteDeviceAction = (deviceId) => ({
    type: DELETE_DEVICE,
    data: deviceId,
});

export const dispatchAddDevice = (device) => async dispatch => dispatch(addDeviceAction(device));
export const dispatchEditDevice = (device) => async dispatch => dispatch(editDeviceAction(device));
export const dispatchDeleteDevice = (deviceId) => async dispatch => dispatch(deleteDeviceAction(deviceId));

export const getDevices = () => async dispatch => {
    return fetch(baseUrl)
        .then(response => {
            if (!response.ok) throw response;
            return response;
        })
        .then(parseJson)
        .then(response => {
            dispatch(addDevicesAction(response));
        })
        .catch(async error => {
            let message = await parseError(error);
            dispatch(addErrorNotification("Error: " + message));
        });
};

export const editDevice = (deviceId, payload) => async dispatch => {
    if (Object.keys(payload).length === 0) {
        dispatch(addErrorNotification("Payload empty"));
        return;
    }

    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };
    return fetch(`${baseUrl}/${deviceId}`, requestOptions)
        .then(response => {
            if (!response.ok) throw response;
            return response;
        })
        .then(parseJson)
        .then(response => {
            dispatch(editDeviceAction(response));
            dispatch(addSuccessNotification("Device edited"));
        })
        .catch(async error => {
            let message = await parseError(error);
            dispatch(addErrorNotification("Error: " + message));
        });
};

export const deleteDevice = (deviceId) => async dispatch => {
    const requestOptions = {
        method: "DELETE"
    };
    return fetch(`${baseUrl}/${deviceId}`, requestOptions)
        .then(response => {
            if (!response.ok) throw response;
            return response;
        })
        .then(() => {
            dispatch(deleteDeviceAction(deviceId));
            dispatch(addSuccessNotification("Device deleted"));
        })
        .catch(async error => {
            let message = await parseError(error);
            dispatch(addErrorNotification("Error: " + message));
        });
};

export const setDeviceQuery = (query) => async dispatch => {
    dispatch({
        type: SET_DEVICE_QUERY,
        data: query,
    });
};

export const setDeviceSort = (sortBy, sortOrder) => async dispatch => {
    dispatch({
        type: SET_DEVICE_SORT,
        data: {
            sortBy,
            sortOrder
        },
    });
};
