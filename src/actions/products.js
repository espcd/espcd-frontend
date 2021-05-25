import {backendUrl, fetchGet, fetchPatchDelete} from "./common";

export const ADD_PRODUCTS = "ADD_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const SET_PRODUCT_QUERY = "SET_PRODUCT_QUERY";
export const SET_PRODUCT_SORT = "SET_PRODUCT_SORT";

const baseUrl = `${backendUrl}/products`;

export const addProductsAction = (products) => ({
    type: ADD_PRODUCTS,
    data: products,
});

export const addProductAction = (product) => ({
    type: ADD_PRODUCT,
    data: product,
});

export const editProductAction = (product) => ({
    type: EDIT_PRODUCT,
    data: product,
});

export const deleteProductAction = (productId) => ({
    type: DELETE_PRODUCT,
    data: productId,
});

export const dispatchAddProduct = (product) => async dispatch => dispatch(addProductAction(product));
export const dispatchEditProduct = (product) => async dispatch => dispatch(editProductAction(product));
export const dispatchDeleteProduct = (productId) => async dispatch => dispatch(deleteProductAction(productId));

export const getProducts = () => async dispatch => {
    fetchGet(
        dispatch,
        baseUrl,
        response => dispatch(addProductsAction(response))
    );
};

export const createProduct = (payload) => async dispatch => {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };
    return fetchPatchDelete(
        dispatch,
        baseUrl,
        requestOptions,
        "Product created"
    );
};

export const editProduct = (productId, payload) => async dispatch => {
    const requestOptions = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    };
    return fetchPatchDelete(
        dispatch,
        `${baseUrl}/${productId}`,
        requestOptions,
        "Product edited"
    );
};

export const deleteProduct = (productId) => async dispatch => {
    const requestOptions = {
        method: "DELETE"
    };
    return fetchPatchDelete(
        dispatch,
        `${baseUrl}/${productId}`,
        requestOptions,
        "Product deleted"
    );
};

export const setProductQuery = (query) => async dispatch => {
    dispatch({
        type: SET_PRODUCT_QUERY,
        data: query,
    });
};

export const setProductSort = (sortBy, sortOrder) => async dispatch => {
    dispatch({
        type: SET_PRODUCT_SORT,
        data: {
            sortBy,
            sortOrder
        },
    });
};
