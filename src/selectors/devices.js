import {createSelector} from "reselect";
import {filterItems, sortItems} from "./common";

const getDevices = (state) => state.devicesReducer.devices;
const getQuery = (state) => state.devicesReducer.query;
const getSortBy = (state) => state.devicesReducer.sortBy;
const getSortOrder = (state) => state.devicesReducer.sortOrder;

export const getFilteredAndSortedDevices = createSelector(
    [getDevices, getQuery, getSortBy, getSortOrder],
    (devices, query, sortBy, sortOrder) =>
        sortItems(filterItems(devices, query), sortBy, sortOrder)
);

export const getModels = createSelector(
    getDevices,
    (devices) => {
        let models = devices.map(device => device.model.toLocaleLowerCase())
        return [...new Set(models)]
    }
)
