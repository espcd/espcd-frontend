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

    static formDataFromFirmware(firmware, content) {
        let data = new FormData()
        Object.keys(firmware).forEach(key => {
            data.append("firmware[" + key + "]", firmware[key])
        })
        data.append("firmware[content]", content);
        return data
    }

    static createFirmware(firmware, content) {
        let data = this.formDataFromFirmware(firmware, content)

        const requestOptions = {
            method: 'POST',
            body: data
        };
        return fetch(`${this.firmwaresUrl}`, requestOptions)
            .then(response => response.json());
    }

    static editFirmware(firmware, content) {
        const firmwareId = firmware.id
        firmware = this.removeStaticElements(firmware)

        let data = this.formDataFromFirmware(firmware, content)

        const requestOptions = {
            method: 'PATCH',
            body: data
        };
        return fetch(`${this.firmwaresUrl}/${firmwareId}`, requestOptions);
    }
}
