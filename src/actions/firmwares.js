import {backendUrl, parseError, parseJson, removeStaticElements} from "./common";
import {addErrorNotification, addSuccessNotification} from "./notifications";

export const ADD_FIRMWARES = "ADD_FIRMWARES"

const baseUrl = `${backendUrl}/firmwares`

export const addFirmwares = (firmwares) => ({
    type: ADD_FIRMWARES,
    data: firmwares,
});

export const getFirmwares = () => async dispatch => {
    return fetch(baseUrl)
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(parseJson)
        .then(response => {
            dispatch(addFirmwares(response));
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
}

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
    firmware = removeStaticElements(firmware)
    let data = formDataFromFirmware(firmware, content)

    const requestOptions = {
        method: 'POST',
        body: data
    };
    return fetch(baseUrl, requestOptions)
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(parseJson)
        .then(response => {
            dispatch(addSuccessNotification("Firmware created"))
            dispatch(getFirmwares());
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
}

export const editFirmware = (firmware, content) => async dispatch => {
    const firmwareId = firmware.id
    firmware = removeStaticElements(firmware)
    let data = formDataFromFirmware(firmware, content)

    const requestOptions = {
        method: 'PATCH',
        body: data
    };
    return fetch(`${baseUrl}/${firmwareId}`, requestOptions)
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(parseJson)
        .then(response => {
            dispatch(addSuccessNotification("Firmware edited"))
            dispatch(getFirmwares());
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
}
