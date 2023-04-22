export function getValueFromLocalStorage(key, defaultValue) {
    var value = localStorage.getItem(key);
    if (value === null) {
        return defaultValue;
    } else {
        return value;
    }
}

export function setValueInLocalStorage(key, value) {
    localStorage.setItem(key, value);
}
