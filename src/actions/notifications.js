export const ADD_NOTIFICATION = "ADD_NOTIFICATION"
export const CLEAR_NOTIFICATION = "CLEAR_NOTIFICATION"

export const addNotification = (message, severity) => ({
    type: ADD_NOTIFICATION,
    data: {
        message: message,
        severity: severity
    },
})

export const addSuccessNotification = (message) => async dispatch => {
    dispatch(addNotification(message, "success"))
};

export const addErrorNotification = (message) => async dispatch => {
    dispatch(addNotification(message, "error"))
};

export const clearNotification = () => async dispatch => {
    dispatch({
        type: CLEAR_NOTIFICATION
    })
};
