import {combineReducers} from "redux";
import {devicesReducer} from "./devices";
import {firmwaresReducer} from "./firmwares";

export default combineReducers({
    devicesReducer,
    firmwaresReducer
});
