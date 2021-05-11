export const backendUrl = 'http://localhost:3000'

export const removeStaticElements = (object) => {
    object = {...object};  // deep copy object
    delete object["id"]
    delete object["created_at"]
    delete object["updated_at"]
    return object
}
