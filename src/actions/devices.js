import {backendUrl, parseError, parseJson, removeStaticElements} from "./common";
import {addErrorNotification, addSuccessNotification} from "./notifications";

export const ADD_DEVICES = "ADD_DEVICES"
export const EDIT_DEVICE = "EDIT_DEVICE"

const baseUrl = `${backendUrl}/devices`

export const addDevicesAction = (devices) => ({
    type: ADD_DEVICES,
    data: devices,
});

export const editDeviceAction = (device) => ({
    type: EDIT_DEVICE,
    data: device,
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

export const editDevice = (device) => async dispatch => {
    const deviceId = device.id
    device = removeStaticElements(device)
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(device)
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
