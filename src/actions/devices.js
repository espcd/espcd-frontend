export const ADD_DEVICES = "ADD_DEVICES"

const baseUrl = 'http://localhost:3000'

export const addDevices = (devices) => ({
    type: ADD_DEVICES,
    data: devices,
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
