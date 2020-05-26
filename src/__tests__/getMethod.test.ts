import getMethod from "../lib/getMethod";

const ID = "cffc024d-6001-4ca4-bfe1-35a17de0df4f";

describe("getMethod", () => {
  it("returns POST if data is provided", () => {
    const method = getMethod("GET", {
      foo: "bar",
    });
    expect(method).toBe("POST");
  });

  it("returns PUT if data is provided and ID is present", () => {
    const method = getMethod(
      "GET",
      {
        foo: "bar",
      },
      ID,
    );
    expect(method).toBe("PUT");
  });

  it("returns GET if data no data is set", () => {
    const method = getMethod("GET");
    expect(method).toBe("GET");
  });
});
