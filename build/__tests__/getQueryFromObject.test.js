"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getQueryFromObject_1 = __importDefault(require("../lib/getQueryFromObject"));
const queryObject = {
    foo: "bar",
    bar: "baz",
};
describe("get query from object", () => {
    it("returns null if there is no input", () => {
        const returnValue = getQueryFromObject_1.default(1);
        expect(returnValue).toBe(null);
    });
    it("returns array with query from a given object", () => {
        const returnValue = getQueryFromObject_1.default(queryObject);
        expect(returnValue.length).toBe(Object.keys(queryObject).length);
        expect(returnValue[0]).toBe("foo=bar");
        expect(returnValue[1]).toBe("bar=baz");
    });
});
//# sourceMappingURL=getQueryFromObject.test.js.map