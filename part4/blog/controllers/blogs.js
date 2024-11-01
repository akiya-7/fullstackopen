const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {

  const {title, author, url, likes} = request.body

  try {
    const user = request.user

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

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const blogId = request.params.id

    const user = request.user
    const blogToDelete = await Blog.findById(blogId)

    if (!blogToDelete) {
      return response.status(404).json({message: "Blog does not exist."})
    }

    if (blogToDelete.user.toString() !== user.id.toString()){
      return response.status(403).json({message: 'Forbidden: You are not allowed to delete this blog.'});
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId)
    return response.status(200).json({message: 'Successfully deleted', blog: deletedBlog})

  }
  catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const changes = request.body.data

  const updatedBlog = await
      Blog.findByIdAndUpdate(blogId, changes, { new: true })
  response.json({message: "Successfully Updated", blog: updatedBlog})
})

module.exports = blogsRouter

