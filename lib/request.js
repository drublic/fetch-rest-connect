import nodeFetch from 'node-fetch'
import 'whatwg-fetch'

const request = (url, options) => {
  if (window) {
    return fetch(url, options)
  }

  return nodeFetch(url, options)
}


export default request
