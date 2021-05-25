import {backendUrl, fetchGet, fetchPatchDelete} from "./common";
import {addErrorNotification} from "./notifications";

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
    fetchGet(
        dispatch,
        baseUrl,
        response => dispatch(addDevicesAction(response))
    );
};

export const editDevice = (deviceId, payload) => async dispatch => {
    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };
    fetchPatchDelete(
        dispatch,
        `${baseUrl}/${deviceId}`,
        requestOptions,
        "Device edited"
    );
};

export const deleteDevice = (deviceId) => async dispatch => {
    const requestOptions = {
        method: "DELETE"
    };
    fetchPatchDelete(
        dispatch,
        `${baseUrl}/${deviceId}`,
        requestOptions,
        "Device deleted"
    );
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
