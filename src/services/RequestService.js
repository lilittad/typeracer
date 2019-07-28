import axios from 'axios';

export default class RequestService {
    baseUrl = '';
    configs = {};

    addRequestConfig(key, value) {
        this.configs[key] = value;
    }

    request(url, method = 'GET', configs = {}) {
        const options = {
                ...this.configs,
                ...configs,
                method,
                url,
            };
        return axios(options).then(({ data }) => data);
    }

    get(reqUrl, params) {
        const url = `${this.baseUrl}${reqUrl}`;
        const configs = {params};
        return this.request(url, 'GET', configs);
    }

    post(reqUrl, data) {
        const url = `${this.baseUrl}${reqUrl}`;
        const configs = {data};
        return this.request(url, 'POST', configs);
    }

    put(reqUrl, data) {
        const url = `${this.baseUrl}${reqUrl}`;
        const configs = {data};
        return this.request(url, 'PUT', configs);
    }
}
