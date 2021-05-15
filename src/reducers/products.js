import {ADD_PRODUCTS} from "../actions/products"

const initialState = {
    products: []
};

export const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCTS:
            let products = action.data
            return {
                ...state,
                products: products,
                error: ""
            }
        default:
            return state
    }
};
