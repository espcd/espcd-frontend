import {combineReducers} from "redux";
import {devicesReducer} from "./devices";
import {firmwaresReducer} from "./firmwares";
import {productsReducer} from "./products";
import {notificationsReducer} from "./notifications";
import {dialogsReducer} from "./dialogs";
import {sessionReducer} from "./session";
import {tokensReducer} from "./tokens";
import {userReducer} from "./user";
import {boardTypesReducer} from "./boardTypes";

export default combineReducers({
    devicesReducer,
    firmwaresReducer,
    productsReducer,
    notificationsReducer,
    dialogsReducer,
    sessionReducer,
    tokensReducer,
    userReducer,
    boardTypesReducer
});
