export default class BackendApi {
    static baseUrl = 'http://localhost:3000';

    static getDevices() {
        return fetch(`${this.baseUrl}/devices`)
            .then(response => response.json());
    }

    static getFirmwares() {
        return fetch(`${this.baseUrl}/firmwares`)
            .then(response => response.json());
    }
}
