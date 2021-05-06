export const ADD_DEVICES = "ADD_DEVICES"
export const DEVICES_ERROR = "DEVICES_ERROR"
export const DEVICES_LOADED = "DEVICESS_LOADED"

const baseUrl = 'http://localhost:3000'

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
    fetch(`${baseUrl}/devices`)
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
