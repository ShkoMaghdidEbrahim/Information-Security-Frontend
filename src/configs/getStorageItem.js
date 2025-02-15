function getStorageItem(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

export default getStorageItem;
