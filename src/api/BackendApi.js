export default class BackendApi {
    static baseUrl = 'http://localhost:3000';

    static getDevices() {
        return fetch(`${this.baseUrl}/devices`)
            .then(response => response.json());
    }
}
