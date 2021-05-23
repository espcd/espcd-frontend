import {backendUrl, parseError, parseJson} from "./common";
import {addErrorNotification, addSuccessNotification} from "./notifications";

export const ADD_DEVICES = "ADD_DEVICES"
export const EDIT_DEVICE = "EDIT_DEVICE"
export const DELETE_DEVICE = "DELETE_DEVICE"

const baseUrl = `${backendUrl}/devices`

export const addDevicesAction = (devices) => ({
    type: ADD_DEVICES,
    data: devices,
});

export const editDeviceAction = (device) => ({
    type: EDIT_DEVICE,
    data: device,
});

export const deleteDeviceAction = (deviceId) => ({
    type: DELETE_DEVICE,
    data: deviceId,
});

export const getDevices = () => async dispatch => {
    return fetch(baseUrl)
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(parseJson)
        .then(response => {
            dispatch(addDevicesAction(response));
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
}

export const editDevice = (deviceId, payload) => async dispatch => {
    if (Object.keys(payload).length === 0) {
        dispatch(addErrorNotification("Payload empty"))
        return
    }

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };
    return fetch(`${baseUrl}/${deviceId}`, requestOptions)
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(parseJson)
        .then(response => {
            dispatch(editDeviceAction(response));
            dispatch(addSuccessNotification("Device edited"))
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
}

export const deleteDevice = (deviceId) => async dispatch => {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(`${baseUrl}/${deviceId}`, requestOptions)
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(() => {
            dispatch(deleteDeviceAction(deviceId));
            dispatch(addSuccessNotification("Device deleted"))
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
}
