export const OPEN_DIALOG = "OPEN_DIALOG";
export const CLOSE_DIALOG = "CLOSE_DIALOG";
export const CONFIRMATION_DIALOG = "CONFIRMATION_DIALOG";

export const openDialog = (type, props) => async dispatch => {
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
