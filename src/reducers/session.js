import {SET_TOKEN} from "../actions/session";

const initialState = {
    token: null
};

export const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                token: action.data
            };
        default:
            return state;
    }
};
