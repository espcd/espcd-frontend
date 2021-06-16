import {backendUrl, fetchGet} from "./common";

export const ADD_BOARD_TYPES = "ADD_BOARD_TYPES";
export const ADD_BOARD_TYPE = "ADD_BOARD_TYPE";
export const EDIT_BOARD_TYPE = "EDIT_BOARD_TYPE";
export const DELETE_BOARD_TYPE = "DELETE_BOARD_TYPE";
export const ADD_BOARD_TYPE_VERSIONS = "ADD_BOARD_TYPE_VERSIONS";

const baseUrl = `${backendUrl}/board_types`;

const addBoardTypesAction = (boardTypes) => ({
    type: ADD_BOARD_TYPES,
    data: boardTypes,
});

const addBoardTypeAction = (boardType) => ({
    type: ADD_BOARD_TYPE,
    data: boardType,
});

const editBoardTypeAction = (boardType) => ({
    type: EDIT_BOARD_TYPE,
    data: boardType,
});

const deleteBoardTypeAction = (boardTypeId) => ({
    type: DELETE_BOARD_TYPE,
    data: boardTypeId,
});

const addBoardTypeVersionsAction = (boardTypeId, versions) => ({
    type: ADD_BOARD_TYPE_VERSIONS,
    data: {
        id: boardTypeId,
        versions
    },
});

export const dispatchAddBoardType = (boardType) => async dispatch => dispatch(addBoardTypeAction(boardType));
export const dispatchEditBoardType = (boardType) => async dispatch => dispatch(editBoardTypeAction(boardType));
export const dispatchDeleteBoardType = (boardTypeId) => async dispatch => dispatch(deleteBoardTypeAction(boardTypeId));

export const getBoardTypes = () => async (dispatch, getState) => {
    return fetchGet(
        dispatch,
        getState,
        baseUrl
    ).then(response => dispatch(addBoardTypesAction(response)));
};

export const getBoardTypeVersions = (boardTypeId) => async (dispatch, getState) => {
    return fetchGet(
        dispatch,
        getState,
        `${baseUrl}/${boardTypeId}/versions`
    ).then(response => dispatch(addBoardTypeVersionsAction(boardTypeId, response)));
};
