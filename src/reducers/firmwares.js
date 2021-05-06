import {ADD_FIRMWARES, FIRMWARES_ERROR, FIRMWARES_LOADED} from "../actions/firmwares";

const initialState = {
    firmwares: [],
    error: "",
    loaded: false
};

export const firmwaresReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FIRMWARES:
            let firmwares = action.data;
            return {
                ...state,
                firmwares: firmwares,
                error: ""
            };
        case FIRMWARES_ERROR:
            return {
                ...state,
                error: action.data,
                firmwares: []
            };
        case FIRMWARES_LOADED:
            return {
                ...state,
                loaded: true
            };
        default:
            return state;
    }
};
