const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {

  const {title, author, url, likes} = request.body
  try {
    const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
    title: title,
    author: author,
    url: url,
    user: user.id,
    likes: likes ? likes : 0,
    })

    const savedBlog = await blog.save()
    user.blogs = await user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
  catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const blogId = request.params.id
    const decodedToken = jwt.verify(request.token, process.env.JWT_SECRET)

    const user = await User.findById(decodedToken.id)
    const blogToDelete = await Blog.findById(blogId)

    // Check if authorized to delete blog

    if (blogToDelete.user.toString() === user.id.toString()) {
      const deletedBlog = await Blog.findByIdAndDelete(blogId)
      response.status(200).json({message: "Successfully deleted", blog: deletedBlog })
    }
    else
      return response.status(403).json({ message: "Forbidden: You are not allowed to delete this blog." })

  }
  catch (error) {
    next(error)
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

