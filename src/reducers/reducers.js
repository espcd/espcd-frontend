import {combineReducers} from "redux";
import {devicesReducer} from "./devices";
import {firmwaresReducer} from "./firmwares";
import {productsReducer} from "./products";

export default combineReducers({
    devicesReducer,
    firmwaresReducer,
    productsReducer
});
