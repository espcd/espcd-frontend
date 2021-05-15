import {ADD_DEVICES, EDIT_DEVICE} from "../actions/devices";

const initialState = {
    devices: []
};

export const devicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DEVICES:
            return {
                ...state,
                devices: action.data,
                error: ""
            }
        case EDIT_DEVICE:
            return {
                ...state,
                devices: state.devices.map(device => device.id === action.data.id ? action.data : device
                )
            }
        default:
            return state
    }
};
