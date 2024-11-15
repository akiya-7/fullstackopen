const { describe, test } = require("node:test")
const assert = require("node:assert")
const listHelper = require("../utils/list_helpers")
const {listWithOneBlog, testListBlogs} = require("../utils/example_lists")

test('dummy returns one', () => {

  const result = listHelper.dummy([])
  assert.strictEqual(result,1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(testListBlogs)
    assert.strictEqual(result, 36)
  })
})

describe('favourite blog', () => {

  test('of empty list is zero', () => {
    const result = listHelper.favouriteBlog([])
    assert.deepStrictEqual(result, {})
  })
  test('when list has only one blog, equals the that', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result,
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5,
      })
  })
  test('of a bigger list, equals that of biggest likes', () => {
    const result = listHelper.favouriteBlog(testListBlogs)
    assert.deepStrictEqual(result,
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,})
  })
})

describe('most blogs', () => {

  test('of empty list {}', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, {})
  })
  test('when list has only one blog, equals author and blogs', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result,
      { author: 'Edsger W. Dijkstra', blogs: 1 })
  })
  test('of a bigger list, equals accum blogs of author', () => {
    const result = listHelper.mostBlogs(testListBlogs)
    assert.deepStrictEqual(result,
      { author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {

  test('of empty list {}', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, {})
  })
  test('when list has only one blog, equals author and likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result, {author: "Edsger W. Dijkstra", likes: 5})
  })
  test('of a bigger list, equals accum likes of author', () => {
    const result = listHelper.mostLikes(testListBlogs)
    assert.deepStrictEqual(result, {author: "Edsger W. Dijkstra", likes: 17})
  })
})
