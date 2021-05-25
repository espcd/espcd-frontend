import {CLOSE_DIALOG, OPEN_DIALOG} from "../actions/dialog";

const initialState = {
    open: false,
    type: null,
    props: {}
};

export const dialogReducer = (state = initialState, action) => {
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
                open: false
            };
        default:
            return state;
    }
};
