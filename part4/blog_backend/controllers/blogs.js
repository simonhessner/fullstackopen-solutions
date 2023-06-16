const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  try {
    const user = request.user
    if (user === null) {
      return response.status(401).send({
        error: 'User is not logged in'
      })
    }

    // add user to the blog
    const blog = new Blog(body)
    blog.user = user.id
    const savedBlog = await blog.save()

    // Add blog to the user
    user.blogs = user.blogs.concat(blog._id)
    user.save()

    response.status(201).json(savedBlog)
  } catch(exception) {
    return response.status(400).send({
      error: exception.message
    })
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = request.user
    if (user === null) {
      return response.status(401).send({
        error: 'User is not logged in'
      })
    }

    const blog = await Blog.findById(request.params.id)
    if(blog !== null) {
      const blog_user_id = blog.user.toString()
      const user_id = user.id
      if(blog_user_id !== user_id) {
        logger.info(user_id, 'tried to delete a blog created by', blog_user_id)
        return response.status(401).send({
          error: 'User is not the owner of this blog',
          username: blog.user.username + ' ',
          username2: user.username
        })
      }

      user.blogs = user.blogs.filter(id => id !== blog.id)
      user.save()

      await Blog.findByIdAndDelete(blog.id)
    }

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