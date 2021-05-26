export const filterItems = (items, query) => items.filter(item => {
    return Object.keys(item).some(key => {
        let value = item[key];
        let valueStr = value ? String(value).toLowerCase() : "";
        return valueStr.includes(query.toLowerCase());
    });
});

export const sortItems = (items, sortBy, sortOrder) => {
    let compareFN;
    if (sortOrder === "asc") {
        compareFN = (a, b) => {
            let aVal = a[sortBy] ? a[sortBy] : "";
            let bVal = b[sortBy] ? b[sortBy] : "";
            return aVal.localeCompare(bVal);
        };
    } else {
        compareFN = (a, b) => {
            let aVal = a[sortBy] ? a[sortBy] : "";
            let bVal = b[sortBy] ? b[sortBy] : "";
            return bVal.localeCompare(aVal);
        };
    }
    return items.sort(compareFN);
};
