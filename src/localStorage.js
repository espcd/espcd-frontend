const key = "state";

export const saveState = (state) => {
    let string = JSON.stringify(state);
    localStorage.setItem(key, string);
};

export const loadState = () => {
    try {
        let string = localStorage.getItem(key);
        if (string === null) {
            return undefined;
        }
        return JSON.parse(string);
    } catch (e) {
        return undefined;
    }
};
