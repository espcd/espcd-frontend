export const ADD_FIRMWARES = "ADD_FIRMWARES"

const baseUrl = 'http://localhost:3000'

export const addFirmwares = (firmwares) => ({
    type: ADD_FIRMWARES,
    data: firmwares,
});

export const getFirmwares = () => async dispatch => {
    fetch(`${baseUrl}/firmwares`)
        .then(response => response.json())
        .then(firmwares => {
            dispatch(addFirmwares(firmwares));
        })
};
