import {createSelector} from "reselect";
import {filterItems, sortItems} from "./common";

const getTokens = (state) => state.tokensReducer.tokens;
const getQuery = (state) => state.tokensReducer.query;
const getSortBy = (state) => state.tokensReducer.sortBy;
const getSortOrder = (state) => state.tokensReducer.sortOrder;

export const getFilteredAndSortedTokens = createSelector(
    [getTokens, getQuery, getSortBy, getSortOrder],
    (tokens, query, sortBy, sortOrder) =>
        sortItems(filterItems(tokens, query), sortBy, sortOrder)
);
