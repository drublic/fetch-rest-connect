import getMethod from './lib/getMethod'
import request from './lib/request'
import getQueryFromObject from './lib/getQueryFromObject'
import resolveUriWithParams from './lib/resolveUriWithParams'

class Fetcher {
  static throwError(error) {
    let responseError
    try {
      responseError = JSON.parse(error)
    } catch (e) {
      responseError = error
    }

    return {
      error: true,
      message: responseError,
    }
  }

  constructor(config) {
    this.apiUrl = config.apiUrl

    const endpoints = Object.keys(config.endpoints).map(key => (
      [key, config.endpoints[key]]
    ))

    this.endpoints = new Map(endpoints)
  }

  getUri(action, id, uriParams, additionalQueryParams) {
    let url = this.apiUrl

    if (this.endpoints.has(action)) {
      url += `${this.endpoints.get(action)}/`
    } else {
      throw new Error(`Action "${action}" not defined`)
    }

    if (id) {
      url += `${id}/`
    }

    url = resolveUriWithParams(url, uriParams)

    if (typeof additionalQueryParams === 'object') {
      const params = getQueryFromObject(additionalQueryParams)

      url += `?${params.join('&')}`
    }

    return url
  }

  /* public */fetch(
    action,
    id,
    uriParams,
    additionalQueryParams,
    data,
    method,
    headers,
  ) {
    const url = this.getUri(action, id, uriParams, additionalQueryParams)

    const headerConfig = Object.assign({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, headers)

    const options = {
      headers: new Headers(headerConfig),
      method: method || getMethod(method, data, id),
    }

    if (data) {
      options.body = JSON.stringify(data)
    }

    return request(url, options)
      .then((response) => {
        if (!response.ok) {
          return Fetcher.throwError(response.statusText)
        }

        return response.json()
      })
      .catch(Fetcher.throwError)
  }

  /**
   * Aliases
   */
  /* public */getAll(endpoint, uriParams = {}, additionalQueryParams = {}) {
    return this.fetch(
      endpoint,
      undefined,
      uriParams,
      additionalQueryParams,
      undefined,
      'GET',
    )
  }

  /* public */get(endpoint, id, uriParams = {}, additionalQueryParams = {}) {
    return this.fetch(
      endpoint,
      id,
      uriParams,
      additionalQueryParams,
      undefined,
      'GET',
    )
  }

  /* public */create(endpoint, data, uriParams = {}, additionalQueryParams = {}) {
    return this.fetch(
      endpoint,
      undefined,
      uriParams,
      additionalQueryParams,
      data,
      'PUT',
    )
  }

  /* public */update(endpoint, id, data, uriParams = {}, additionalQueryParams = {}) {
    return this.fetch(
      endpoint,
      id,
      uriParams,
      additionalQueryParams,
      data,
      'POST',
    )
  }

  /* public */upsert(endpoint, id, data, uriParams = {}, additionalQueryParams = {}) {
    return this.fetch(
      endpoint,
      id,
      uriParams,
      additionalQueryParams,
      data,
      id ? 'POST' : 'PUT',
    )
  }

  /* public */delete(endpoint, id, uriParams = {}, additionalQueryParams = {}) {
    return this.fetch(
      endpoint,
      id,
      uriParams,
      additionalQueryParams,
      undefined,
      'DELETE',
    )
  }
}

export default Fetcher
