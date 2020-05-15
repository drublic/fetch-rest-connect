"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getMethod_1 = __importDefault(require("./lib/getMethod"));
const request_1 = __importDefault(require("./lib/request"));
const getQueryFromObject_1 = __importDefault(require("./lib/getQueryFromObject"));
const resolveUriWithParams_1 = __importDefault(require("./lib/resolveUriWithParams"));
const throwError = (error) => {
    let responseError;
    try {
        responseError = JSON.parse(error);
    }
    catch (e) {
        responseError = error;
    }
    return {
        error: true,
        message: responseError,
    };
};
class Fetcher {
    constructor(config) {
        this.apiUrl = config.apiUrl;
        const endpoints = Object.keys(config.endpoints).map((key) => [key, config.endpoints[key]]);
        this.endpoints = new Map(endpoints);
        this.options = config.options || {};
        this.getFilter = config.getFilter;
    }
    getUri(action, id, uriParams, additionalQueryParams) {
        let url = this.apiUrl;
        if (!this.endpoints.has(action)) {
            throw new Error(`Action "${action}" not defined`);
        }
        const endpoint = this.endpoints.get(action);
        url += `${endpoint}/`;
        if (id) {
            url += `${id}/`;
        }
        url = resolveUriWithParams_1.default(url, uriParams);
        const filter = this.getFilter && this.getFilter(endpoint);
        const params = [
            ...(getQueryFromObject_1.default(additionalQueryParams) || []),
            ...(getQueryFromObject_1.default(filter) || []),
        ];
        url += `?${params.join("&")}`;
        return url;
    }
    async fetch(action, id, uriParams, additionalQueryParams, data, method, headers) {
        var _a;
        const url = this.getUri(action, id, uriParams, additionalQueryParams);
        const headerConfig = {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers,
            ...(_a = this.options) === null || _a === void 0 ? void 0 : _a.headers,
        };
        const options = {
            ...this.options,
            headers: headerConfig,
            method: method || getMethod_1.default(method, data, id),
        };
        if (data) {
            options.body = JSON.stringify(data);
        }
        try {
            const response = await request_1.default(url, options);
            if (!response.ok) {
                return throwError(response.statusText);
            }
            return response.json();
        }
        catch (error) {
            return throwError(error);
        }
    }
    /**
     * Aliases
     */
    getAll(endpoint, uriParams = {}, additionalQueryParams = {}, headers) {
        return this.fetch(endpoint, undefined, uriParams, additionalQueryParams, undefined, "GET", headers);
    }
    get(endpoint, id, uriParams = {}, additionalQueryParams = {}, headers) {
        return this.fetch(endpoint, id, uriParams, additionalQueryParams, undefined, "GET", headers);
    }
    create(endpoint, data, uriParams = {}, additionalQueryParams = {}, headers) {
        return this.fetch(endpoint, undefined, uriParams, additionalQueryParams, data, "POST", headers);
    }
    update(endpoint, id, data, uriParams = {}, additionalQueryParams = {}, headers) {
        return this.fetch(endpoint, id, uriParams, additionalQueryParams, data, "PUT", headers);
    }
    upsert(endpoint, id, data, uriParams = {}, additionalQueryParams = {}, headers) {
        return this.fetch(endpoint, id, uriParams, additionalQueryParams, data, id ? "PUT" : "POST", headers);
    }
    delete(endpoint, id, uriParams = {}, additionalQueryParams = {}, headers) {
        return this.fetch(endpoint, id, uriParams, additionalQueryParams, undefined, "DELETE", headers);
    }
}
exports.default = Fetcher;
//# sourceMappingURL=index.js.map