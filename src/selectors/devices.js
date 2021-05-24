import {createSelector} from 'reselect'

const getDevices = (state) => state.devicesReducer.devices
const getQuery = (state) => state.devicesReducer.query

export const getFilteredDevices = createSelector(
    [getDevices, getQuery],
    (devices, query) => devices.filter(device => {
        return Object.keys(device).some(key => {
            let value = device[key]
            return value && String(value).includes(query)
        })
    })
)
