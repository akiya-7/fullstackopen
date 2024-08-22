const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const payload = request.body

  const blog = new Blog({
    title: payload.title,
    author: payload.author,
    url: payload.url,
    likes: payload.likes ? payload.likes : 0,
      })

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
  catch (error) {
    response.status(400).json({error: error.message})
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id

  const deletedBlog = await Blog.findByIdAndDelete(blogId)

  if (deletedBlog) {
    response.json({
      message: "Successfully deleted",
      blog: deletedBlog })
  }
  else {
    response.status(404).json({
      message: "ID  does not exist",})
    .end()
  }
})

module.exports = blogsRouter

