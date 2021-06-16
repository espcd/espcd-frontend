export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";
export const CONFIRMATION_DIALOG = "CONFIRMATION_DIALOG";
export const DEVICE_DIALOG = "DEVICE_DIALOG";
export const FIRMWARE_DIALOG = "FIRMWARE_DIALOG";
export const PRODUCT_DIALOG = "PRODUCT_DIALOG";
export const TOKEN_DIALOG = "TOKEN_DIALOG";
export const USER_DIALOG = "USER_DIALOG";
export const PRODUCT_FIRMWARE_DIALOG = "PRODUCT_FIRMWARE_DIALOG";

const openDialogAction = (type, props = {}) => ({
    type: OPEN_DIALOG,
    data: {
        type,
        props
    },
});

export const openConfirmationDialog = props => async dispatch => {
    dispatch(openDialogAction(CONFIRMATION_DIALOG, props));
};

export const openDeviceDialog = props => async dispatch => {
    dispatch(openDialogAction(DEVICE_DIALOG, props));
};

export const openFirmwareDialog = props => async dispatch => {
    dispatch(openDialogAction(FIRMWARE_DIALOG, props));
};

export const openProductDialog = props => async dispatch => {
    dispatch(openDialogAction(PRODUCT_DIALOG, props));
};

export const openTokenDialog = props => async dispatch => {
    dispatch(openDialogAction(TOKEN_DIALOG, props));
};

export const openUserDialog = props => async dispatch => {
    dispatch(openDialogAction(USER_DIALOG, props));
};

export const openProductFirmwareDialog = props => async dispatch => {
    dispatch(openDialogAction(PRODUCT_FIRMWARE_DIALOG, props));
};

export const closeDialog = () => async dispatch => {
    dispatch({
        type: CLOSE_DIALOG
    });
};
