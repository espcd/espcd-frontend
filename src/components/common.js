export const objectValueChanged = (localObj, removeObj, key) => {
    return localObj.hasOwnProperty(key) && valueChanged(localObj[key], removeObj[key]);
};

export const valueChanged = (localValue, remoteValue) => {
    return localValue !== remoteValue &&
        (localValue !== "" || remoteValue !== null) &&
        (localValue !== null || remoteValue !== "");
};
