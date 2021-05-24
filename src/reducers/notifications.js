import {ADD_NOTIFICATION, CLEAR_NOTIFICATION} from "../actions/notifications";

const initialState = {
    open: false,
    message: "",
    severity: "success"
};

export const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return {
                ...state,
                open: true,
                ...action.data
            };
        case CLEAR_NOTIFICATION:
            return {
                ...state,
                open: false
            };
        default:
            return state;
    }
};
