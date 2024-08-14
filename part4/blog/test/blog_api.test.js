const { test, after, beforeEach } = require('node:test')
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

test.only('blog info is returned as json', async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})