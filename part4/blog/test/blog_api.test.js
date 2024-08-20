const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const {testListBlogs, blogToPost} = require('../utils/example_lists')


const api = supertest(app)

beforeEach( async () => {
  await Blog.deleteMany()

  const blogObjects = testListBlogs.map(blog => new Blog(blog))
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
test.only("insure blog is being added to database correctly", async () => {
  const databaseLength = (await api.get("/api/blogs")).body.length

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

after(async () => {
  await mongoose.connection.close()
})