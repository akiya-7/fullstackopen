const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const {testListBlogs} = require('../utils/example_lists')


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
test.only("unique identifier property is named id.", async () => {
  const response = await api.get("/api/blogs")
  const blogs = response.body

  blogs.forEach(blog => {
    assert.ok(blog.id)
    assert.ok(!blog._id)
  })
})

after(async () => {
  await mongoose.connection.close()
})