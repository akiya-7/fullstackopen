const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {

  const {title, author, url, likes} = request.body
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.JWT_SECRET)

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

