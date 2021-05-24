import {createSelector} from 'reselect'
import {filterItems, sortItems} from "./common";

const getProducts = (state) => state.productsReducer.products
const getQuery = (state) => state.productsReducer.query
const getSortBy = (state) => state.productsReducer.sortBy
const getSortOrder = (state) => state.productsReducer.sortOrder

export const getFilteredAndSortedProducts = createSelector(
    [getProducts, getQuery, getSortBy, getSortOrder],
    (products, query, sortBy, sortOrder) =>
        sortItems(filterItems(products, query), sortBy, sortOrder)
)
