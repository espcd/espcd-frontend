import {backendUrl, removeStaticElements} from "./common";

export const ADD_DEVICES = "ADD_DEVICES"
export const DEVICES_ERROR = "DEVICES_ERROR"
export const DEVICES_LOADED = "DEVICESS_LOADED"

const baseUrl = `${backendUrl}/devices`

export const addDevices = (devices) => ({
    type: ADD_DEVICES,
    data: devices,
});

export const devicesError = (message) => ({
    type: DEVICES_ERROR,
    data: message
});

export const devicesLoaded = () => ({
    type: DEVICES_LOADED
});

export const getDevices = () => async dispatch => {
    fetch(baseUrl)
        .then(response => response.json())
        .then(devices => {
            dispatch(addDevices(devices));
        })
        .catch((error) => {
            console.log(error);
            dispatch(devicesError("Devices could not be loaded"));
        })
        .finally(() => {
            dispatch(devicesLoaded());
        });
};

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
        .then(() => dispatch(getDevices()));
}
