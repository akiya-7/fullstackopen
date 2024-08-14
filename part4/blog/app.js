const config = require("./utils/config");

const express = require("express");
const app = express()

const cors = require('cors')
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");


console.log("Connecting to", config.MONGO_URL)

mongoose.connect(config.MONGO_URL)
  .then(() => {(console.log("Connected to MongoDB"))})
  .catch(error => {console.log("Failed to connect to MongoDB:", error)})

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app;