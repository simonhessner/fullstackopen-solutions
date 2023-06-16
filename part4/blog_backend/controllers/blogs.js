const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  try {
    const user = await User.findOne({}) // TODO

    // add user to the blog
    const blog = new Blog(request.body)
    blog.user = user
    const savedBlog = await blog.save()

    // Add blog to the user
    user.blogs = user.blogs.concat(blog)
    user.save()

    response.status(201).json(savedBlog)
  } catch(exception) {
    response.status(400).end()
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(result)
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter