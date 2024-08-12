const mongoose = require('mongoose')
const config = require("../utils/config");

console.log("Connecting to", config.MONGO_URL)

mongoose.connect(config.MONGO_URL)
  .then(() => {(console.log("Connected to MongoDB"))})
  .catch(error => {console.log("Failed to connect to MongoDB:", error)})


const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)