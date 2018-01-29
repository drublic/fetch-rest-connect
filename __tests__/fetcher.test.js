import ENDPOINT_DATA from './data/foo'
import Fetcher from '../'

global.fetch = jest.fn().mockImplementation(() => Promise.resolve(ENDPOINT_DATA))

describe('Fetcher', () => {
  const ENDPOINT = 'foo'
  const ID = 'cffc024d-6001-4ca4-bfe1-35a17de0df4f'
  const fetcher = new Fetcher({
    apiUrl: '/',
    endpoints: {
      [ENDPOINT]: ENDPOINT,
    },
  })

  it('provides a complete url', () => {
    let url = fetcher.getUrl(ENDPOINT)
    expect(url).toBe(`/${ENDPOINT}/`)

    url = fetcher.getUrl(ENDPOINT, ID)
    expect(url).toBe(`/${ENDPOINT}/${ID}/`)

    url = fetcher.getUrl(ENDPOINT, ID, {
      env: 'bar',
    })
    expect(url).toBe(`/${ENDPOINT}/${ID}/?env=bar`)

    url = fetcher.getUrl(ENDPOINT, undefined, {
      env: 'bar',
    })
    expect(url).toBe(`/${ENDPOINT}/?env=bar`)
  })
})
