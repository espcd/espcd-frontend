import {ADD_DEVICES, DELETE_DEVICE, EDIT_DEVICE} from "../actions/devices";

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
                devices: state.devices.map(device => device.id === action.data.id ? action.data : device)
            }
        case DELETE_DEVICE:
            return {
                ...state,
                devices: state.devices.filter(device => device.id !== action.data)
            }
        default:
            return state
    }
};
