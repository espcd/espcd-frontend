import {ADD_PRODUCT, ADD_PRODUCTS, DELETE_PRODUCT, EDIT_PRODUCT} from "../actions/products"

const initialState = {
    products: []
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCTS:
            return {
                ...state,
                products: action.data,
                error: ""
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
        default:
            return state
    }
};
