"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolveUriWithParams_1 = __importDefault(require("../lib/resolveUriWithParams"));
const uri = "/:foo/:bar";
const queryObject = {
    foo: "bar",
    bar: "baz",
};
describe("resolve uri with variables", () => {
    it("returns given uri if there is no param to resolve", () => {
        const returnUri = resolveUriWithParams_1.default(uri, undefined);
        expect(returnUri).toBe(uri);
    });
    it("resolves uris with given parameters from object", () => {
        const returnUri = resolveUriWithParams_1.default(uri, queryObject);
        expect(returnUri).toBe("/bar/baz");
    });
});
//# sourceMappingURL=resolveUriWithParams.test.js.map