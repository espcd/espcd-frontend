export default class BackendApi {
    static baseUrl = 'http://localhost:3000'
    static devicesUrl = `${this.baseUrl}/devices`
    static firmwaresUrl = `${this.baseUrl}/firmwares`

    static removeStaticElements(object) {
        object = {...object};  // deep copy object
        delete object["id"]
        delete object["created_at"]
        delete object["updated_at"]
        return object
    }

    static getDevices() {
        return fetch(this.devicesUrl)
            .then(response => response.json());
    }

    static editDevice(device) {
        const deviceId = device.id
        device = this.removeStaticElements(device)
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(device)
        };
        return fetch(`${this.devicesUrl}/${deviceId}`, requestOptions);
    }

    static getFirmwares() {
        return fetch(this.firmwaresUrl)
            .then(response => response.json());
    }

    static createFirmware(firmware) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(firmware)
        };
        return fetch(`${this.firmwaresUrl}`, requestOptions)
            .then(response => response.json());
    }

    static addFirmwareContent(firmwareId, content) {
        let data = new FormData()
        data.append("content", content);
        const requestOptions = {
            method: 'POST',
            body: data
        };
        return fetch(`${this.firmwaresUrl}/${firmwareId}/content`, requestOptions);
    }

    static editFirmware(firmware) {
        const firmwareId = firmware.id
        firmware = this.removeStaticElements(firmware)
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(firmware)
        };
        return fetch(`${this.firmwaresUrl}/${firmwareId}`, requestOptions);
    }
}
