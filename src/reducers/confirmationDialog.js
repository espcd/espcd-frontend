import {OPEN_CONFIRMATION_DIALOG, CLOSE_CONFIRMATION_DIALOG} from "../actions/confirmationDialog";

const initialState = {
    open: false,
    title: "",
    content: "",
    handleOk: () => {}
};

export const confirmationDialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_CONFIRMATION_DIALOG:
            return {
                ...state,
                open: true,
                ...action.data
            }
        case CLOSE_CONFIRMATION_DIALOG:
            return {
                ...state,
                open: false
            }
        default:
            return state
    }
};
