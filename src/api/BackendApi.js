export default class BackendApi {
    static baseUrl = 'http://localhost:3000'
    static devicesUrl = `${this.baseUrl}/devices`

    static removeStaticElements(object) {
        delete object["created_at"]
        delete object["updated_at"]
        return object
    }

    static getDevices() {
        return fetch(this.devicesUrl)
            .then(response => response.json());
    }

    static editDevice(device) {
        device = this.removeStaticElements(device)
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(device)
        };
        return fetch(`${this.devicesUrl}/${device.id}`, requestOptions);
    }

    static getFirmwares() {
        return fetch(`${this.baseUrl}/firmwares`)
            .then(response => response.json());
    }
}
