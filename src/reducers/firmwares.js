import {ADD_FIRMWARES} from "../actions/firmwares";

const initialState = {
    firmwares: []
};

export const firmwaresReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FIRMWARES:
            let firmwares = action.data
            return {
                ...state,
                firmwares: firmwares,
                error: ""
            }
        default:
            return state
    }
};
