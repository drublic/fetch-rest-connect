import resolveUriWithParams from "../lib/resolveUriWithParams";

const uri = "/:foo/:bar";
const queryObject = {
  foo: "bar",
  bar: "baz",
};

describe("resolve uri with variables", () => {
  it("returns given uri if there is no param to resolve", () => {
    const returnUri = resolveUriWithParams(uri, undefined);

    expect(returnUri).toBe(uri);
  });

  it("resolves uris with given parameters from object", () => {
    const returnUri = resolveUriWithParams(uri, queryObject);

    expect(returnUri).toBe("/bar/baz");
  });
});
