import {ADD_DEVICES} from "../actions/devices";

const initialState = {
    devices: []
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
        default:
            return state;
    }
};
