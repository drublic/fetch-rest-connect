"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolveUriWithParams = (uri, params) => {
    if (!params) {
        return uri;
    }
    let returnUri = uri;
    Object.keys(params).forEach((param) => {
        returnUri = returnUri.replace(`:${param}`, params[param]);
    });
    return returnUri;
};
exports.default = resolveUriWithParams;
//# sourceMappingURL=resolveUriWithParams.js.map