function sum (a, b) {
  return a + b
}

// uses jest as a testing framework. see https://jestjs.io/docs/en/getting-started.html for syntax
test('ensures sum function works', () => {
  expect(sum(1, 5)).toBe(6)
})
