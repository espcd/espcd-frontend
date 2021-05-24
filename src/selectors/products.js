import {createSelector} from 'reselect'

const getProducts = (state) => state.productsReducer.products
const getQuery = (state) => state.productsReducer.query

export const getFilteredProducts = createSelector(
    [getProducts, getQuery],
    (products, query) => products.filter(product => {
        return Object.keys(product).some(key => {
            let value = product[key]
            return value && String(value).includes(query)
        })
    })
)
