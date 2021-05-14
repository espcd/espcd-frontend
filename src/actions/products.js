import {backendUrl, removeStaticElements} from "./common";

export const ADD_PRODUCTS = "ADD_PRODUCTS"
export const PRODUCTS_ERROR = "PRODUCTS_ERROR"
export const PRODUCTS_LOADED = "PRODUCTSS_LOADED"

const baseUrl = `${backendUrl}/products`

export const addProducts = (products) => ({
    type: ADD_PRODUCTS,
    data: products,
});

export const productsError = (message) => ({
    type: PRODUCTS_ERROR,
    data: message
});

export const productsLoaded = () => ({
    type: PRODUCTS_LOADED
});

export const getProducts = () => async dispatch => {
    fetch(baseUrl)
        .then(response => response.json())
        .then(products => {
            dispatch(addProducts(products));
        })
        .catch((error) => {
            console.log(error);
            dispatch(productsError("Products could not be loaded"));
        })
        .finally(() => {
            dispatch(productsLoaded());
        });
};

export const createProduct = (product) => async dispatch => {
    product = removeStaticElements(product)

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    };
    return fetch(baseUrl, requestOptions)
        .then(response => response.json())
        .then(() => dispatch(getProducts()));
}

export const editProduct = (product) => async dispatch => {
    const productId = product.id
    product = removeStaticElements(product)
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    };
    return fetch(`${baseUrl}/${productId}`, requestOptions)
        .then(() => dispatch(getProducts()));
}
