const { test } = require("node:test")
const assert = require("node:assert")
const listHelpers = require("../utils/list_helpers")

test('dummy returns one', () => {
  const blogs = []

  const result = listHelpers.dummy(blogs)
  assert.strictEqual(result,1)
})