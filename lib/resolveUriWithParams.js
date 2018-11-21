const resolveUriWithParams = (uri, params) => {
  if (!params) {
    return uri
  }

  let returnUri = uri

  Object.keys(params).forEach((param) => {
    returnUri = returnUri.replace(`:${param}`, params[param])
  })

  return returnUri
}

export default resolveUriWithParams
