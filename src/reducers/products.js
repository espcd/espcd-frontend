import {ADD_PRODUCTS, PRODUCTS_ERROR, PRODUCTS_LOADED} from "../actions/products";

const initialState = {
    products: [],
    error: "",
    loaded: false
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCTS:
            let products = action.data;
            return {
                ...state,
                products: products,
                error: ""
            };
        case PRODUCTS_ERROR:
            return {
                ...state,
                error: action.data,
                products: []
            };
        case PRODUCTS_LOADED:
            return {
                ...state,
                loaded: true
            };
        default:
            return state;
    }
};
