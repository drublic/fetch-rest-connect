const getQueryFromObject = (
  input: Record<string, string> | undefined,
): string[] | undefined => {
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
    .filter((parameter): parameter is string => parameter !== undefined);
};

export default getQueryFromObject;
