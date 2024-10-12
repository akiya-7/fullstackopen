const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const {importUserList, importBlogList2, blogToPost} = require('../utils/example_lists');

const api = supertest(app)

beforeEach(async () => {
  // Set Users
  await User.deleteMany()

  const userObjects = importUserList.map(user => new User(user))
  const userPromiseArray = userObjects.map(user => user.save())
  await Promise.all(userPromiseArray)

  // Set Blogs
  await Blog.deleteMany()

  const blogObjects = importBlogList2.map(blog => new Blog(blog))
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
    await api
      .post("/api/users")
      .send(user)
      .expect(201)

  })
})

test.only("Blog post contains a user", async () => {
  const user = {
    username: "USERNAME",
    name: "NAME",
    password: "PASSWORD",
  }

  // Create User
  const createUser = await api
    .post("/api/users")
    .send(user)
    .expect(201)

  // Log In
  const loginResponse = await api
    .post("/api/login")
    .send({
      username: user.username,
      password: user.password
    })
    .expect(200)

  // Ensure the token is present
  const token = loginResponse.body.token

  // Post a blog with the user's token
  const blogResponse = await api
    .post("/api/blogs")
    .set('Authorization', `Bearer ${token}`)
    .send(blogToPost)

  assert.deepStrictEqual(createUser.body.id, blogResponse.body.user)

})
test.only("Send blog with incorrect token", async () => {
  const blogResponse = await api
    .post("/api/blogs")
    .set('Authorization', `Bearer invalidtoken`)
    .send(blogToPost)
    .expect(400)

    assert.deepStrictEqual(blogResponse.body.error, 'token missing or invalid')
})

after(async () => {
  await mongoose.connection.close()
})
