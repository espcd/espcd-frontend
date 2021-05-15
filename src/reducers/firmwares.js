import {ADD_FIRMWARE, ADD_FIRMWARES, EDIT_FIRMWARE} from "../actions/firmwares";

const initialState = {
    firmwares: []
};

export const firmwaresReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FIRMWARES:
            return {
                ...state,
                firmwares: action.data,
                error: ""
            }
        case ADD_FIRMWARE:
            return {
                ...state,
                firmwares: [...state.firmwares, action.data]
            }
        case EDIT_FIRMWARE:
            return {
                ...state,
                firmwares: state.firmwares.map(firmware => firmware.id === action.data.id ? action.data : firmware
                )
            }
        default:
            return state
    }
};
