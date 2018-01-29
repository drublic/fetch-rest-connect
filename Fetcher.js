class Fetcher {
  static getMethod(method = 'GET', data, id) {
    if (data) {
      if (id) {
        return 'PUT'
      }

      return 'POST'
    }

    return method
  }

  static throwError(error) {
    return {
      error: true,
      message: error,
    }
  }

  constructor(config) {
    this.config = config
  }

  getUrl(action, id, addinitinalParameters) {
    let url = this.config.endpoint

    if (this.config.map.has(action)) {
      url += Map.get(action)
    } else {
      throw new Error(`Action "${action}" not defined`)
    }

    if (id) {
      url += `${id}/`
    }

    if (typeof addinitinalParameters === 'object') {
      url += `?${JSON.stringify(addinitinalParameters)}`
    }

    return url
  }

  /* public */fetch(action, id, addinitinalParameters, data, method) {
    const url = this.getUrl(action, id, addinitinalParameters)

    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })

    const options = {
      headers,
      method: method || Fetcher.getMethod(method, data, id),
    }

    if (data) {
      try {
        options.body = JSON.stringify(data)
      } catch (error) {
        return Fetcher.throwError(error)
      }
    }

    return window
      .fetch(url, options)
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
  /* public */getAll(endpoint, addinitinalParameters = {}) {
    return this
      .fetch(endpoint, undefined, addinitinalParameters, undefined, 'GET')
  }

  /* public */get(endpoint, id, addinitinalParameters = {}) {
    return this
      .fetch(endpoint, id, addinitinalParameters, undefined, 'GET')
  }

  /* public */create(endpoint, data, addinitinalParameters) {
    return this
      .fetch(endpoint, undefined, addinitinalParameters, data, 'PUT')
  }

  /* public */update(endpoint, id, data, addinitinalParameters) {
    return this
      .fetch(endpoint, id, addinitinalParameters, data, 'POST')
  }

  /* public */upsert(endpoint, id, data, addinitinalParameters) {
    return this
      .fetch(endpoint, id, addinitinalParameters, data, id ? 'POST' : 'PUT')
  }

  /* public */delete(endpoint, id, addinitinalParameters) {
    return this
      .fetch(endpoint, id, addinitinalParameters, undefined, 'DELETE')
  }
}

export default Fetcher
