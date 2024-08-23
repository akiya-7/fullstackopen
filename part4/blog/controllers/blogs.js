const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const {title, author, url, user, likes} = request.body

  // const user = await User.findById(payload.userId)

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    // user: user.id,
    user: user ? user : "aaaaaaaaaaaaaaaaaaaaaaaa",
    likes: likes ? likes : 0,
      })

  try {
    const savedBlog = await blog.save()
    // user.notes = user.notes.concat(savedBlog._id)
    // await user.save()
    response.status(201).json(savedBlog)
  }
  catch (error) {
    response.status(400).json({error: error.message})
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id

  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId)
    response
    .status(204)
    .json({message: "Successfully deleted", blog: deletedBlog })
  }
  catch (error) {
    response.status(404).json({error: error.message}).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const changes = request.body

  const updatedBlog = await
      Blog.findByIdAndUpdate(blogId, changes, { new: true })

  response.json(updatedBlog)
})

module.exports = blogsRouter

