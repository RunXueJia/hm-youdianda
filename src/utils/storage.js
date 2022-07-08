export const setItem = (key, data) => {
    if (typeof data === 'object') return localStorage.setItem(key, JSON.stringify(data))
    localStorage.setItem(key, data)
}

export const getItem = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (error) {
        return localStorage.getItem(key)
    }
}
export const removeItem = (key) => {
    localStorage.removeItem(key)
}