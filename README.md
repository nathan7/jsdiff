# jsdiff

  diff values

## Installation

    npm install jsdiff

## API
### diff(a, b)

  returns an object with truthy values for stuff that changed.

  `diff({ a: 'foo' }, {})` -> `{ a: true }`
  `diff({ a: 'foo' }, { a: 'bar' })` -> `{ a: true }`
  `diff({ a: 'foo' }, { b: 'bar' })` -> `{ a: true }`
  `diff({}, { b: 'foo' })` -> `false`
  `diff({ a: { b: 'foo'} }, { b: 'bar' })` -> `{ a: { b: true } }`
  `diff([1, 2, 3], [1, 2, 4])` -> `[ , , true ]`

