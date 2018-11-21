import getQueryFromObject from '../lib/getQueryFromObject'

const queryObject = {
  foo: 'bar',
  bar: 'baz',
}

describe('get query from object', () => {
  it('returns null if there is no input', () => {
    const returnValue = getQueryFromObject(1)

    expect(returnValue).toBe(null)
  })

  it('returns array with query from a given object', () => {
    const returnValue = getQueryFromObject(queryObject)

    expect(returnValue.length).toBe(Object.keys(queryObject).length)
    expect(returnValue[0]).toBe('foo=bar')
    expect(returnValue[1]).toBe('bar=baz')
  })
})
