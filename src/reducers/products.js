import {ADD_PRODUCT, ADD_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT, SET_PRODUCT_QUERY} from "../actions/products"

const initialState = {
    products: [],
    query: ""
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCTS:
            return {
                ...state,
                products: action.data
            }
        case ADD_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.data]
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                products: state.products.map(product => product.id === action.data.id ? action.data : product)
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.data)
            }
        case SET_PRODUCT_QUERY:
            return {
                ...state,
                query: action.data
            }
        default:
            return state
    }
};
