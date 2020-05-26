import Fetcher from "..";

const ENDPOINT_DATA = {
  foo: "bar",
};

jest.mock("node-fetch", () => (request) => {
  if (request.includes("failure")) {
    return {
      some: "error",
    };
  }

  return {
    ok: true,
    json: () => ({
      foo: "bar",
    }),
  };
});

describe("Fetcher", () => {
  const ENDPOINT = "foo";
  const ID = "cffc024d-6001-4ca4-bfe1-35a17de0df4f";
  const fetcher = new Fetcher({
    apiUrl: "/",
    endpoints: {
      [ENDPOINT]: ENDPOINT,
    },
  });

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
      (fetcher as any).getUri();
    }).toThrow();
  });

  it("gets data from endpoint", async () => {
    const response = await fetcher.fetch(ENDPOINT, ID);

    expect(response).toEqual(ENDPOINT_DATA);
  });

  it("posts data to api", async () => {
    const response = await fetcher.fetch(ENDPOINT, ID, undefined, {
      foo: "baz",
    });

    expect(response).toEqual(ENDPOINT_DATA);
  });

  it("returns error if rejected", async () => {
    const response = await fetcher.fetch(ENDPOINT, "failure");

    expect(response.error).toBeTruthy();
  });

  it("returns error with meaningful error", async () => {
    const response = await fetcher.fetch(ENDPOINT, "failure");

    expect(response.data.some).toBeTruthy();
  });
});
