'use strict'

const addObjects = adders => (a, b) => {
  const result = {}
  Object.keys(adders).forEach(adderName => {
    const adder = adders[adderName]
    result[adderName] = adder(a[adderName], b[adderName])
  })
  return result
}

module.exports = addObjects
