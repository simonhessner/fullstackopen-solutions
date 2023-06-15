const mongoose = require('mongoose')
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

afterAll(async () => {
  await mongoose.connection.close()
})