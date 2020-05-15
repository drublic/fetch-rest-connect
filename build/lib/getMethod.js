"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMethod = (method = "GET", data, id) => {
    if (data) {
        if (id) {
            return "PUT";
        }
        return "POST";
    }
    return method;
};
exports.default = getMethod;
//# sourceMappingURL=getMethod.js.map