"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getQueryFromObject = (input) => {
    if (!input || typeof input !== "object") {
        return undefined;
    }
    return Object.entries(input)
        .map(([key, val]) => {
        if (val) {
            return `${key}=${val}`;
        }
        return undefined;
    })
        .filter((parameter) => parameter !== undefined);
};
exports.default = getQueryFromObject;
//# sourceMappingURL=getQueryFromObject.js.map