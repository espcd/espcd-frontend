import {ADD_DEVICES, DELETE_DEVICE, EDIT_DEVICE, SET_DEVICE_QUERY, SET_DEVICE_SORT} from "../actions/devices";

const initialState = {
    devices: [],
    query: "",
    sortBy: "title",
    sortOrder: "asc"
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
        case SET_DEVICE_SORT:
            let sortBy = action.data.sortBy;
            let sortOrder = action.data.sortOrder;

            if (sortBy === state.sortBy) {
                sortOrder = sortOrder === "asc" ? "desc" : "asc";
            } else {
                sortOrder = "asc";
            }

            return {
                ...state,
                sortBy: sortBy,
                sortOrder: sortOrder,
            }
        default:
            return state
    }
};
