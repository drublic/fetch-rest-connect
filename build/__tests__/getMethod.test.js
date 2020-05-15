"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getMethod_1 = __importDefault(require("../lib/getMethod"));
const ID = "cffc024d-6001-4ca4-bfe1-35a17de0df4f";
describe("getMethod", () => {
    it("returns POST if data is provided", () => {
        const method = getMethod_1.default("GET", {
            foo: "bar",
        });
        expect(method).toBe("POST");
    });
    it("returns PUT if data is provided and ID is present", () => {
        const method = getMethod_1.default("GET", {
            foo: "bar",
        }, ID);
        expect(method).toBe("PUT");
    });
    it("returns GET if data no data is set", () => {
        const method = getMethod_1.default("GET");
        expect(method).toBe("GET");
    });
});
//# sourceMappingURL=getMethod.test.js.map