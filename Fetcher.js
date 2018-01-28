class Fetcher {
  constructor(config) {
    this.config = config
  }

  _getUrl(action, id, addinitinalParameters) {
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

  _getMethod(method = 'GET', data, id) {
    if (data) {
      if (id) {
        return 'PUT'
      }

      return 'POST'
    }

    return method
  }

  _throwError(error) {
    return {
      error: true,
      message: error,
    }
  }

  fetch(action, id, addinitinalParameters, data, method) {
    const url = this._getUrl(action, id, addinitinalParameters)

    const headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })

    let options = {
      headers,
      method: this._getMethod(method, data, id),
    }

    if (data) {
      try {
        options.body = JSON.stringify(data)
      } catch (error) {
        return this._throwError(error)
      }
    }

    return window
      .fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          return this._throwError(response.statusText)
        }

        return response.json()
      })
      .catch(this._throwError)
  }
}

export default Fetcher
