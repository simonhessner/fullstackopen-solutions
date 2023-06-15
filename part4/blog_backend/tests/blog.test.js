const mongoose = require('mongoose')
mongoose.set('bufferTimeoutMS', 30000)
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [{
  title: 'First blog entry',
  author: 'Max Mustermann',
  url: 'https://fullstackopen.com/en/part4/testing_the_backend#initializing-the-database-before-tests',
  likes: 10
},
{
  title: 'Second blog entry',
  author: 'Eva Musterfrau',
  url: 'https://lodash.com/docs/4.17.15#reduce',
  likes: 12
}]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('GET /api/blogs', async () => {
  const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
  expect(response.body.length).toBe(initialBlogs.length)
})

test('has id', async () => {
  const blogs = (await api.get('/api/blogs')).body
  expect(blogs[0].id).toBeDefined()
})

test('add blog post', async () => {
  const newBlog = {
    title: 'This is new',
    author: 'Walter White',
    url: 'blabla',
    likes: 2
  }
  const response = await api.post('/api/blogs').send(newBlog).expect(201)
  const id = response.body.id

  const currentBlogs = await Blog.find({})
  expect(currentBlogs.length).toBe(initialBlogs.length + 1)

  const foundBlog = await Blog.findById(id)
  expect(foundBlog.title).toBe(newBlog.title)
  expect(foundBlog.author).toBe(newBlog.author)
  expect(foundBlog.url).toBe(newBlog.url)
  expect(foundBlog.likes).toBe(newBlog.likes)
})

test('likes default to 0', async () => {
  const newBlog = {
    title: 'This blog has no like property',
    author: 'Walter White',
    url: 'https://google.com'
  }
  const response = await api.post('/api/blogs').send(newBlog)

  expect(response.body.likes).toBe(0)
})

test('title is required', async () => {
  const newBlog = {
    author: 'Walter White',
    url: 'https://google.com'
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('url is required', async () => {
  const newBlog = {
    title: 'This blog has no url property',
    author: 'Walter White'
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})