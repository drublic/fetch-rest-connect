"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const foo_1 = __importDefault(require("./data/foo"));
const Fetcher_1 = __importDefault(require("../Fetcher"));
const { fetch } = global;
describe("Fetcher", () => {
    const ENDPOINT = "foo";
    const ID = "cffc024d-6001-4ca4-bfe1-35a17de0df4f";
    const fetcher = new Fetcher_1.default({
        apiUrl: "/",
        endpoints: {
            [ENDPOINT]: ENDPOINT,
        },
    });
    fetch.mockResponse(JSON.stringify(foo_1.default));
    it("provides a complete url", () => {
        let url = fetcher.getUri(ENDPOINT);
        expect(url).toBe(`/${ENDPOINT}/`);
        url = fetcher.getUri(ENDPOINT, ID);
        expect(url).toBe(`/${ENDPOINT}/${ID}/`);
        url = fetcher.getUri(ENDPOINT, ID, undefined, {
            env: "bar",
        });
        expect(url).toBe(`/${ENDPOINT}/${ID}/?env=bar`);
        url = fetcher.getUri(ENDPOINT, undefined, undefined, {
            env: "bar",
        });
        expect(url).toBe(`/${ENDPOINT}/?env=bar`);
        url = fetcher.getUri(ENDPOINT, undefined, undefined, {
            env: "bar",
            foo: undefined,
        });
        expect(url).toBe(`/${ENDPOINT}/?env=bar`);
    });
    it("throws if no action is provided while getting URL", () => {
        expect(() => {
            fetcher.getUri();
        }).toThrow();
    });
    it("gets data from endpoint", (done) => {
        expect.assertions(1);
        fetcher.fetch(ENDPOINT, ID).then((data) => {
            expect(data).toEqual(foo_1.default);
            done();
        });
    });
    it("posts data to api", (done) => {
        fetcher
            .fetch(ENDPOINT, ID, undefined, {
            foo: "baz",
        })
            .then((data) => {
            expect(data).toEqual(foo_1.default);
            done();
        });
    });
    it("returns error if rejected", (done) => {
        fetch.mockRejectOnce(JSON.stringify(foo_1.default));
        fetcher.fetch(ENDPOINT).then((data) => {
            expect(data).toEqual({
                error: true,
                message: foo_1.default,
            });
            done();
        });
    });
});
//# sourceMappingURL=fetcher.test.js.map