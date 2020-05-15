"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const request = (url, options) => {
    if (typeof window !== "undefined") {
        return window.fetch(url, options);
    }
    return node_fetch_1.default(url, options);
};
exports.default = request;
//# sourceMappingURL=request.js.map