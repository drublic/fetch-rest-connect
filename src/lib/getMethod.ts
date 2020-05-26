const getMethod = (method = "GET", data?, id?) => {
  if (data) {
    if (id) {
      return "PUT";
    }

    return "POST";
  }

  return method;
};

export default getMethod;
