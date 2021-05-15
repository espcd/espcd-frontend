import {backendUrl, parseError, parseJson, removeStaticElements} from "./common";
import {addErrorNotification, addSuccessNotification} from "./notifications";

export const ADD_PRODUCTS = "ADD_PRODUCTS"

const baseUrl = `${backendUrl}/products`

export const addProducts = (products) => ({
    type: ADD_PRODUCTS,
    data: products,
});

export const getProducts = () => async dispatch => {
    return fetch(baseUrl)
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(parseJson)
        .then(response => {
            dispatch(addProducts(response));
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
}

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
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(parseJson)
        .then(response => {
            dispatch(addSuccessNotification("Product created"))
            dispatch(getProducts());
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
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
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(parseJson)
        .then(response => {
            dispatch(addSuccessNotification("Product edited"))
            dispatch(getProducts());
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
}
