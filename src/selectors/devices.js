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
