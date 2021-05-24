import {
    ADD_FIRMWARE,
    ADD_FIRMWARES,
    DELETE_FIRMWARE,
    EDIT_FIRMWARE,
    SET_FIRMWARE_QUERY,
    SET_FIRMWARE_SORT
} from "../actions/firmwares";

const initialState = {
    firmwares: [],
    query: "",
    sortBy: "title",
    sortOrder: "asc"
};

export const firmwaresReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FIRMWARES:
            return {
                ...state,
                firmwares: action.data
            };
        case ADD_FIRMWARE:
            return {
                ...state,
                firmwares: [...state.firmwares, action.data]
            };
        case EDIT_FIRMWARE:
            return {
                ...state,
                firmwares: state.firmwares.map(firmware => firmware.id === action.data.id ? action.data : firmware)
            };
        case DELETE_FIRMWARE:
            return {
                ...state,
                firmwares: state.firmwares.filter(firmware => firmware.id !== action.data)
            };
        case SET_FIRMWARE_QUERY:
            return {
                ...state,
                query: action.data
            };
        case SET_FIRMWARE_SORT:
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
            };
        default:
            return state;
    }
};
