const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const lists = require('../utils/example_lists')


const api = supertest(app)

beforeEach( async () => {
  await Blog.deleteMany()

  const blogObjects = lists.testListBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})

test('blog info is returned as json', async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test("unique identifier property is named id.", async () => {
  const response = await api.get("/api/blogs")
  const blogs = response.body

  blogs.forEach(blog => {
    assert.ok(blog.id)
    assert.ok(!blog._id)
  })
})
test("insure blog is being added to database correctly", async () => {
  const databaseLength = (await api.get("/api/blogs")).body.length
  const blogToPost = lists.blogToPost

  const response = await api
      .post("/api/blogs")
      .send(blogToPost)
  const savedBlog = response.body
  const newDatabaseLength = (await api.get("/api/blogs")).body.length

  assert.equal(savedBlog.title, blogToPost.title)
  assert.equal(savedBlog.author, blogToPost.author)
  assert.equal(savedBlog.url, blogToPost.url)
  assert.equal(savedBlog.likes, blogToPost.likes)
  assert.equal(databaseLength + 1, newDatabaseLength)

})
test("verify missing likes defaults to 0 on post", async () => {
  const blogNoLikes = lists.blogNoLikes
  const response = await api
  .post("/api/blogs")
  .send(blogNoLikes)

  const savedBlog = response.body
  console.log(savedBlog.likes);

  assert(savedBlog.likes === 0)
})
test("insure title and url", async () => {
  const blogNoTitle = lists.blogNoTitle
  const blogNoUrl = lists.blogNoUrl

  const titleResponse = await
      api
      .post("/api/blogs/")
      .send(blogNoTitle)
      .expect(400)
  assert(titleResponse.body.error.includes("Path `title` is required"))

  const urlResponse = await
      api
      .post("/api/blogs/")
      .send(blogNoUrl)
      .expect(400)
  assert(urlResponse.body.error.includes("Path `url` is required"))
})

describe("test delete functionality", () => {
  test("delete existing item", async () => {
    const blog = lists.testListBlogs[0]

    const response = await api.delete(`/api/blogs/${blog.id}`)
    assert.deepEqual(response.body,
        { message: "Successfully deleted", blog: blog })
  })
  test("attempt to delete non existent item", async () => {
    const randomID = Math.floor(Math.random() * 5)
    const errorMessage = await api.delete(`/api/blogs/${randomID}`).expect(404)
    assert.deepStrictEqual(errorMessage.body,
        { error: `Cast to ObjectId failed for value "${randomID}" ` +
              `(type string) at path "_id" for model "Blog"`})
  })
})

test.only("test like update", async () => {
  const blog = lists.testListBlogs[1]

  blog.likes = 1612

  const updatedBlog = await
      api.put(`/api/blogs/${blog._id}`)
      .send(blog)

  assert.equal(updatedBlog.body.likes, 1612)

})


after(async () => {
  await mongoose.connection.close()
})