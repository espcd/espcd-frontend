import {backendUrl, fetchGet, fetchPostPatchDelete} from "./common";

export const ADD_FIRMWARES = "ADD_FIRMWARES";
export const ADD_FIRMWARE = "ADD_FIRMWARE";
export const EDIT_FIRMWARE = "EDIT_FIRMWARE";
export const DELETE_FIRMWARE = "DELETE_FIRMWARE";
export const SET_FIRMWARE_QUERY = "SET_FIRMWARE_QUERY";
export const SET_FIRMWARE_SORT = "SET_FIRMWARE_SORT";

const baseUrl = `${backendUrl}/firmwares`;

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

export const dispatchAddFirmware = (firmware) => async dispatch => dispatch(addFirmwareAction(firmware));
export const dispatchEditFirmware = (firmware) => async dispatch => dispatch(editFirmwareAction(firmware));
export const dispatchDeleteFirmware = (firmwareId) => async dispatch => dispatch(deleteFirmwareAction(firmwareId));

export const getFirmwares = () => async (dispatch, getState) => {
    fetchGet(
        dispatch,
        getState,
        baseUrl,
        response => dispatch(addFirmwaresAction(response))
    );
};

const formDataFromFirmware = (firmware, content) => {
    let data = new FormData();
    Object.keys(firmware).forEach(key => {
        data.append("firmware[" + key + "]", firmware[key]);
    });
    if (content) {
        data.append("firmware[content]", content);
    }
    return data;
};

export const createFirmware = (payload, content) => async (dispatch, getState) => {
    let data = formDataFromFirmware(payload, content);
    const requestOptions = {
        method: "POST",
        body: data
    };
    return fetchPostPatchDelete(
        dispatch,
        getState,
        baseUrl,
        requestOptions,
        "Firmware created"
    );
};

export const editFirmware = (firmwareId, payload, content) => async (dispatch, getState) => {
    let data = formDataFromFirmware(payload, content);
    const requestOptions = {
        method: "PATCH",
        body: data
    };
    return fetchPostPatchDelete(
        dispatch,
        getState,
        `${baseUrl}/${firmwareId}`,
        requestOptions,
        "Firmware edited"
    );
};

export const deleteFirmware = (firmwareId) => async (dispatch, getState) => {
    const requestOptions = {
        method: "DELETE"
    };
    return fetchPostPatchDelete(
        dispatch,
        getState,
        `${baseUrl}/${firmwareId}`,
        requestOptions,
        "Firmware deleted"
    );
};

export const setFirmwareQuery = (query) => async dispatch => {
    dispatch({
        type: SET_FIRMWARE_QUERY,
        data: query,
    });
};

export const setFirmwareSort = (sortBy, sortOrder) => async dispatch => {
    dispatch({
        type: SET_FIRMWARE_SORT,
        data: {
            sortBy,
            sortOrder
        },
    });
};
