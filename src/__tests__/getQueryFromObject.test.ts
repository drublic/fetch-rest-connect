import getQueryFromObject from "../lib/getQueryFromObject";

const queryObject = {
  foo: "bar",
  bar: "baz",
};

describe("get query from object", () => {
  it("returns undefined if there is no input", () => {
    const returnValue = getQueryFromObject(undefined);

    expect(returnValue).toBe(undefined);
  });

  it("returns array with query from a given object", () => {
    const returnValue = getQueryFromObject(queryObject);

    expect(returnValue?.length).toBe(Object.keys(queryObject).length);
    expect(returnValue?.[0]).toBe("foo=bar");
    expect(returnValue?.[1]).toBe("bar=baz");
  });
});
