import {combineReducers} from "redux";
import {devicesReducer} from "./devices";
import {firmwaresReducer} from "./firmwares";
import {productsReducer} from "./products";
import {notificationsReducer} from "./notifications";

export default combineReducers({
    devicesReducer,
    firmwaresReducer,
    productsReducer,
    notificationsReducer
});
