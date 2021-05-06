export const ADD_FIRMWARES = "ADD_FIRMWARES"
export const FIRMWARES_ERROR = "FIRMWARES_ERROR"
export const FIRMWARES_LOADED = "FIRMWARESS_LOADED"

const baseUrl = 'http://localhost:3000'

export const addFirmwares = (firmwares) => ({
    type: ADD_FIRMWARES,
    data: firmwares,
});

export const firmwaresError = (message) => ({
    type: FIRMWARES_ERROR,
    data: message
});

export const firmwaresLoaded = () => ({
    type: FIRMWARES_LOADED
});

export const getFirmwares = () => async dispatch => {
    fetch(`${baseUrl}/firmwares`)
        .then(response => response.json())
        .then(firmwares => {
            dispatch(addFirmwares(firmwares));
        })
        .catch((error) => {
            console.log(error);
            dispatch(firmwaresError("Firmwares could not be loaded"));
        })
        .finally(() => {
            dispatch(firmwaresLoaded());
        });
};
