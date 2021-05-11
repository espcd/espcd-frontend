import {backendUrl, removeStaticElements} from "./common";

export const ADD_FIRMWARES = "ADD_FIRMWARES"
export const FIRMWARES_ERROR = "FIRMWARES_ERROR"
export const FIRMWARES_LOADED = "FIRMWARESS_LOADED"

const baseUrl = `${backendUrl}/firmwares`

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
    fetch(baseUrl)
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

const formDataFromFirmware = (firmware, content) => {
    let data = new FormData()
    Object.keys(firmware).forEach(key => {
        data.append("firmware[" + key + "]", firmware[key])
    })
    if (content != null) {
        data.append("firmware[content]", content);
    }
    return data
}

export const createFirmware = (firmware, content) => async dispatch => {
    let data = formDataFromFirmware(firmware, content)

    const requestOptions = {
        method: 'POST',
        body: data
    };
    return fetch(baseUrl, requestOptions)
        .then(response => response.json())
        .then(() => dispatch(getFirmwares()));
}

export const editFirmware = (firmware, content) => async dispatch => {
    const firmwareId = firmware.id
    firmware = removeStaticElements(firmware)
    let data = formDataFromFirmware(firmware, content)

    const requestOptions = {
        method: 'PATCH',
        body: data
    };
    fetch(`${baseUrl}/${firmwareId}`, requestOptions)
        .then(() => dispatch(getFirmwares()));
}
