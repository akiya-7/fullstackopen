const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/blog')

const api = supertest(app)

describe.only("Posting invalid users", () => {
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
})

after(async () => {
  await mongoose.connection.close()
})
