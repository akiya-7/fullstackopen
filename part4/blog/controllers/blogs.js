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

  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId)
    response.json({message: "Successfully deleted", blog: deletedBlog })
  }
  catch (error) {
    response.status(404).json({error: error.message}).end()
  }
})

module.exports = blogsRouter

