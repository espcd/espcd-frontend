export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";
export const CONFIRMATION_DIALOG = "CONFIRMATION_DIALOG";
export const DEVICE_DIALOG = "DEVICE_DIALOG";
export const FIRMWARE_DIALOG = "FIRMWARE_DIALOG";
export const PRODUCT_DIALOG = "PRODUCT_DIALOG";
export const TOKEN_DIALOG = "TOKEN_DIALOG";

export const openDialog = (type, props = {}) => async dispatch => {
    dispatch({
        type: OPEN_DIALOG,
        data: {
            type,
            props
        },
    });
};

export const closeDialog = () => async dispatch => {
    dispatch({
        type: CLOSE_DIALOG
    });
};
