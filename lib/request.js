import nodeFetch from 'node-fetch'

const request = (url, options) => {
  if (window) {
    return window.fetch(url, options)
  }

  return nodeFetch(url, options)
}


export default request
