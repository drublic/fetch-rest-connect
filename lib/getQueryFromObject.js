const getQueryFromObject = (input) => {
  if (!input || typeof input !== 'object') {
    return null
  }

  return Object.entries(input)
    .map(([key, val]) => {
      if (val) {
        return `${key}=${val}`
      }

      return null
    })
    .filter(parameter => parameter !== null)
}

export default getQueryFromObject
