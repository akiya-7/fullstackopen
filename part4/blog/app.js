const config = require("./utils/config");

const express = require("express");
const app = express()

const cors = require('cors')
const mongoose = require("mongoose");
const middleware = require('./utils/middleware')

const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

console.log("Connecting to", config.MONGO_URL)

mongoose.connect(config.MONGO_URL)
  .then(() => {(console.log("Connected to MongoDB"))})
  .catch(error => {console.log("Failed to connect to MongoDB:", error)})

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;