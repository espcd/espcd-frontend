import {backendUrl, parseError, parseJson, removeStaticElements} from "./common";
import {addErrorNotification, addSuccessNotification} from "./notifications";

export const ADD_FIRMWARES = "ADD_FIRMWARES"
export const ADD_FIRMWARE = "ADD_FIRMWARE"
export const EDIT_FIRMWARE = "EDIT_FIRMWARE"
export const DELETE_FIRMWARE = "DELETE_FIRMWARE"

const baseUrl = `${backendUrl}/firmwares`

export const addFirmwaresAction = (firmwares) => ({
    type: ADD_FIRMWARES,
    data: firmwares,
});

export const addFirmwareAction = (firmware) => ({
    type: ADD_FIRMWARE,
    data: firmware,
});

export const editFirmwareAction = (firmware) => ({
    type: EDIT_FIRMWARE,
    data: firmware,
});

export const deleteFirmwareAction = (firmwareId) => ({
    type: DELETE_FIRMWARE,
    data: firmwareId,
});

export const getFirmwares = () => async dispatch => {
    return fetch(baseUrl)
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(parseJson)
        .then(response => {
            dispatch(addFirmwaresAction(response));
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
            dispatch(addFirmwareAction(response));
            dispatch(addSuccessNotification("Firmware created"))
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
            dispatch(editFirmwareAction(response));
            dispatch(addSuccessNotification("Firmware edited"))
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
}

export const deleteFirmware = (firmwareId) => async dispatch => {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(`${baseUrl}/${firmwareId}`, requestOptions)
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(() => {
            dispatch(deleteFirmwareAction(firmwareId));
            dispatch(addSuccessNotification("Firmware deleted"))
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
}
