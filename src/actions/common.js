export const backendUrl = 'http://localhost:3000'

export const removeStaticElements = (object) => {
    object = {...object};  // deep copy object
    delete object["id"]
    delete object["created_at"]
    delete object["updated_at"]
    return object
}

export const parseJson = async response => {
    const text = await response.text()
    try {
        return JSON.parse(text)
    } catch (e) {
        return text
    }
}

export const parseError = async error => {
    try {
        return await error.text()
    } catch (e) {
        return error.message
    }
}
