export const backendUrl = 'http://localhost:3000'

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
