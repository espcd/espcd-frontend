import {ADD_DEVICES, DELETE_DEVICE, EDIT_DEVICE, SET_DEVICE_QUERY} from "../actions/devices";

const initialState = {
    devices: [],
    query: ""
};

export const devicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DEVICES:
            return {
                ...state,
                devices: action.data
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
        case SET_DEVICE_QUERY:
            return {
                ...state,
                query: action.data
            }
        default:
            return state
    }
};
