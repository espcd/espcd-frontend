import {ADD_TOKEN, ADD_TOKENS, DELETE_TOKEN, EDIT_TOKEN, SET_TOKEN_QUERY, SET_TOKEN_SORT} from "../actions/tokens";

const initialState = {
    tokens: [],
    query: "",
    sortBy: "title",
    sortOrder: "asc"
};

export const tokensReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOKENS:
            return {
                ...state,
                tokens: action.data
            };
        case ADD_TOKEN:
            return {
                ...state,
                tokens: [...state.tokens, action.data]
            };
        case EDIT_TOKEN:
            return {
                ...state,
                tokens: state.tokens.map(token => token.id === action.data.id ? action.data : token)
            };
        case DELETE_TOKEN:
            return {
                ...state,
                tokens: state.tokens.filter(token => token.id !== action.data)
            };
        case SET_TOKEN_QUERY:
            return {
                ...state,
                query: action.data
            };
        case SET_TOKEN_SORT:
            let sortBy = action.data.sortBy;
            let sortOrder = action.data.sortOrder;

            if (sortBy === state.sortBy) {
                sortOrder = sortOrder === "asc" ? "desc" : "asc";
            } else {
                sortOrder = "asc";
            }

            return {
                ...state,
                sortBy: sortBy,
                sortOrder: sortOrder,
            };
        default:
            return state;
    }
};
