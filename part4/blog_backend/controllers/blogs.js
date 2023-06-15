const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', (request, response) => {
  console.log(request.body)
  const blog = new Blog(request.body)
  console.log(blog)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter