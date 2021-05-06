import {ADD_DEVICES, DEVICES_ERROR, DEVICES_LOADED} from "../actions/devices";

const initialState = {
    devices: [],
    error: "",
    loaded: false
};

export const devicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DEVICES:
            let devices = action.data;
            return {
                ...state,
                devices: devices,
                error: ""
            };
        case DEVICES_ERROR:
            return {
                ...state,
                error: action.data,
                devices: []
            };
        case DEVICES_LOADED:
            return {
                ...state,
                loaded: true
            };
        default:
            return state;
    }
};
