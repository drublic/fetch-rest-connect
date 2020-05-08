import nodeFetch from 'node-fetch'

const request = (url, options) => {
  if (typeof window !== 'undefined') {
    return window.fetch(url, options)
  }

  return nodeFetch(url, options)
}


export default request
