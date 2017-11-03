'use strict'

/* eslint-env mocha */
const addObjects = require('.')
const snapshot = require('snap-shot-it')
const R = require('ramda')

describe('add-objects', () => {
  it('concatenates strings', () => {
    const a = {
      name: 'a'
    }
    const b = {
      name: 'b'
    }
    const adder = addObjects({
      name: R.concat
    })
    snapshot(adder(a, b))
  })

  it('concatenates lists', () => {
    const a = {
      names: ['a1', 'a2']
    }
    const b = {
      names: ['b']
    }
    const adder = addObjects({
      names: R.concat
    })
    snapshot(adder(a, b))
  })

  it('combines multiple properties', () => {
    const a = {
      name: 'a',
      age: 1
    }
    const b = {
      name: 'b',
      age: 2
    }
    const adder = addObjects({
      name: R.concat,
      age: R.add
    })
    snapshot(adder(a, b))
  })

  it('can be used inside reduce', () => {
    const a = {
      name: 'a',
      age: 1
    }
    const b = {
      name: 'b',
      age: 2
    }
    const adder = addObjects({
      name: R.concat,
      age: R.add
    })
    const list = [a, a, b, b]
    const initial = { name: '', age: 0 }
    snapshot(list.reduce(adder, initial))
  })

  it('ignores unspecified properties', () => {
    const a = {
      name: 'a',
      age: 1
    }
    const b = {
      name: 'b',
      age: 2
    }
    const adder = addObjects({
      name: R.concat
      // age does not have an adder
    })
    snapshot(adder(a, b))
  })

  it('can use boolean operators', () => {
    const a = {
      valid: false
    }
    const b = {
      valid: true
    }
    const adder = addObjects({
      valid: R.or
    })
    snapshot(adder(a, b))
  })

  it('can use always operator to override', () => {
    const a = {
      name: 'a'
    }
    const b = {
      name: 'b'
    }
    const adder = addObjects({
      name: R.always('combined')
    })
    snapshot(adder(a, b))
  })
})
