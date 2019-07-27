import axios from 'axios';

export default class RequestService {
    baseUrl = '';
    configs = {};

    addRequestConfig(key, value) {
        this.configs[key] = value;
    }

    request(url, method = 'GET', params = {}) {
        return axios({
            ...this.configs,
            method,
            params,
            url,
        }).then(({ data }) => data);
    }

    get(reqUrl, params) {
        const url = `${this.baseUrl}${reqUrl}`;
        return this.request(url, 'GET', params);
    }

    post(reqUrl) {
        const url = `${this.baseUrl}${reqUrl}`;
        return this.request(url, 'POST');
    }
}
