import {createSelector} from 'reselect'
import {filterItems, sortItems} from "./common";

const getFirmwares = (state) => state.firmwaresReducer.firmwares
const getQuery = (state) => state.firmwaresReducer.query
const getSortBy = (state) => state.firmwaresReducer.sortBy
const getSortOrder = (state) => state.firmwaresReducer.sortOrder

export const getFilteredAndSortedFirmwares = createSelector(
    [getFirmwares, getQuery, getSortBy, getSortOrder],
    (firmwares, query, sortBy, sortOrder) =>
        sortItems(filterItems(firmwares, query), sortBy, sortOrder)
)
