import {backendUrl, parseError, parseJson} from "./common";
import {addErrorNotification, addSuccessNotification} from "./notifications";

export const ADD_PRODUCTS = "ADD_PRODUCTS"
export const ADD_PRODUCT = "ADD_PRODUCT"
export const EDIT_PRODUCT = "EDIT_PRODUCT"
export const DELETE_PRODUCT = "DELETE_PRODUCT"

const baseUrl = `${backendUrl}/products`

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

export const getProducts = () => async dispatch => {
    return fetch(baseUrl)
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(parseJson)
        .then(response => {
            dispatch(addProductsAction(response));
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
}

export const createProduct = (payload) => async dispatch => {
    if (Object.keys(payload).length === 0) {
        dispatch(addErrorNotification("Payload empty"))
        return
    }

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };
    return fetch(baseUrl, requestOptions)
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(parseJson)
        .then(response => {
            dispatch(addProductAction(response));
            dispatch(addSuccessNotification("Product created"))
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
}

export const editProduct = (productId, payload) => async dispatch => {
    if (Object.keys(payload).length === 0) {
        dispatch(addErrorNotification("Payload empty"))
        return
    }

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    };
    return fetch(`${baseUrl}/${productId}`, requestOptions)
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(parseJson)
        .then(response => {
            dispatch(editProductAction(response));
            dispatch(addSuccessNotification("Product edited"))
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
}

export const deleteProduct = (productId) => async dispatch => {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(`${baseUrl}/${productId}`, requestOptions)
        .then(response => {
            if (!response.ok) throw response
            return response
        })
        .then(() => {
            dispatch(deleteProductAction(productId));
            dispatch(addSuccessNotification("Product deleted"))
        })
        .catch(async error => {
            let message = await parseError(error)
            dispatch(addErrorNotification("Error: " + message))
        })
}
