import {ADD_USER} from "../actions/user";

const initialState = {
    username: ""
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                username: action.data
            };
        default:
            return state;
    }
};
