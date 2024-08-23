const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const lists = require('../utils/example_lists')
const {importUserList, importBlogList2, blogToPost} = require('../utils/example_lists');

const api = supertest(app)

beforeEach(async () => {
  // Set Users
  await User.deleteMany()

  const userObjects = lists.importUserList.map(user => new User(user))
  const userPromiseArray = userObjects.map(user => user.save())
  await Promise.all(userPromiseArray)

  // Set Blogs
  await Blog.deleteMany()

  const blogObjects = lists.importBlogList2.map(blog => new Blog(blog))
  const blogPromiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(blogPromiseArray)


})

test.only("Users imported correctly", async () => {
  const response = await User.find({})

  assert.deepEqual(response.length, importUserList.length)
})
test.only("Blogs imported correctly", async () => {
  const response = await Blog.find({})

  assert.deepEqual(response.length, importBlogList2.length)
})

describe.only("Posting users", () => {
  test.only("Invalid username", async () => {
    const noUser = {
      username: "XX",
      name: "NAME",
      password: "PASSWORD"
    }

    const badPost = await api
      .post("/api/users")
      .send(noUser)
      .expect(400)

    assert.deepStrictEqual(badPost.body.error,
        "Username must contain at least 3 characters")
  })
  test.only("Invalid password", async () => {
    const noPass = {
      username: "USERNAME",
      name: "NAME",
      password: "XX"
    }

    const badPost = await api
    .post("/api/users")
    .send(noPass)
    .expect(400)

    assert.deepStrictEqual(badPost.body.error,
        "Password must contain at least 3 characters")
  })
  test.only("Valid User", async () => {
    const user = {
      username: "USERNAME",
      name: "NAME",
      password: "PASSWORD"
    }
    const response = await api
      .post("/api/users")
      .send(user)
      .expect(201)
  })
})

test.only("Blog post contains a user", async () => {
  const testUserId = "aaaaaaaaaaaaaaaaaaaaaaaa"

  const response = await api
    .post("/api/blogs")
    .send(blogToPost)

  assert.deepStrictEqual(response.body.user, testUserId)
})

after(async () => {
  await mongoose.connection.close()
})
