export const OPEN_CONFIRMATION_DIALOG = "OPEN_CONFIRMATION_DIALOG"
export const CLOSE_CONFIRMATION_DIALOG = "CLOSE_CONFIRMATION_DIALOG"

export const openConfirmationDialog = (title, content, handleOk) => async dispatch => {
    dispatch({
        type: OPEN_CONFIRMATION_DIALOG,
        data: {
            title: title,
            content: content,
            handleOk: handleOk
        },
    })
};

export const closeConfirmationDialog = () => async dispatch => {
    dispatch({
        type: CLOSE_CONFIRMATION_DIALOG
    })
};
