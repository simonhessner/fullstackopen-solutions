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

const findFirstBlog = async () => await Blog.findOne({})
const findFirstId = async () => (await findFirstBlog()).id

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('GET /api/blogs', () => {
  test('contains all blogs and is json', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('has id defined', async () => {
    const blogs = (await api.get('/api/blogs')).body
    expect(blogs[0].id).toBeDefined()
  })
})

describe('add blogs', () => {
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
})

describe('delete blog', () => {
  test('reduces blogs in database by 1', async () => {
    const firstId = await findFirstId()
    await api.delete(`/api/blogs/${firstId}`).expect(204)

    const remainingBlogs = await Blog.find({})
    expect(remainingBlogs.length).toBe(initialBlogs.length - 1)

    expect(remainingBlogs.map(b => b.title)).not.toContain(initialBlogs[0].title)
  })

  test('invalid ID results in 400', async () => {
    const invalidId = (await findFirstId()) + 'a'
    await api.delete(`/api/blogs/${invalidId}`).expect(400)
    expect((await Blog.find({})).length).toBe(initialBlogs.length)
  })
})

describe('update blog', () => {
  test('update likes', async () => {
    const firstBlog = await findFirstBlog()
    const firstId = firstBlog.id
    const updatedBlog = { ...firstBlog.toJSON(), likes: firstBlog.likes + 1 }
    await api.put(`/api/blogs/${firstId}`).send(updatedBlog).expect(200)

    const retrievedBlog = await Blog.findById(firstId)
    expect(retrievedBlog.likes).toBe(firstBlog.likes + 1)
  })

  test('update likes of invalid ID', async () => {
    const firstBlog = await findFirstBlog()
    const firstId = firstBlog.id + 'X'
    const updatedBlog = { ...firstBlog.toJSON(), likes: firstBlog.likes + 1 }
    await api.put(`/api/blogs/${firstId}`).send(updatedBlog).expect(400)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})