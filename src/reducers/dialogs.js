import {CLOSE_DIALOG, OPEN_DIALOG} from "../actions/dialogs";

const initialState = {
    open: false,
    type: null,
    props: {}
};

export const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DIALOG:
            return {
                ...state,
                open: true,
                ...action.data
            };
        case CLOSE_DIALOG:
            return {
                ...state,
                open: false,
                type: null,
            };
        default:
            return state;
    }
};
