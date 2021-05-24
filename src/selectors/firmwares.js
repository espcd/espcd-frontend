import {createSelector} from 'reselect'

const getFirmwares = (state) => state.firmwaresReducer.firmwares
const getQuery = (state) => state.firmwaresReducer.query

export const getFilteredFirmwares = createSelector(
    [getFirmwares, getQuery],
    (firmwares, query) => firmwares.filter(firmware => {
        return Object.keys(firmware).some(key => {
            let value = firmware[key]
            return value && String(value).includes(query)
        })
    })
)
