const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

// users in the DB have a has but no password
const initialUsersDB = [
  {
    username: 'walter',
    name: 'Walter White',
    passwordHash: 'gfgdfgfd'
  },
  {
    username: 'peter',
    name: 'Pedro',
    passwordHash: 'ggwoefd'
  }
]

// users sent to the server must have a password but no hash
const initialUsersServer = initialUsersDB.map(user => {
  const newUser = { ...user }
  newUser.password = 'dummy' + user.passwordHash
  delete newUser.passwordHash
  return newUser
})

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(initialUsersDB)
})

const ensureThatNoUserAdded = async () => {
  const usersNow = await User.find({})
  expect(usersNow.length).toBe(initialUsersDB.length)
}

test('user is added', async () => {
  const newUser = {
    username: 'simon',
    name: 'Simon',
    password: 'secret'
  }

  await api.post('/api/users').send(newUser).expect(201)

  const usersNow = await User.find({})
  expect(usersNow.length).toBe(initialUsersDB.length + 1)
})

describe('username', () => {
  test('is unique', async () => {
    const response = await api.post('/api/users').send(initialUsersServer[0]).expect(400)
    expect(response.body.error).toContain('user already exists')

    await ensureThatNoUserAdded()
  })

  test('must be given', async () => {
    const invalidUser = {
      name: 'Simon',
      password: 'secret'
    }

    const response = await api.post('/api/users').send(invalidUser).expect(400)
    expect(response.body.error).toContain('`username` is required')

    await ensureThatNoUserAdded()
  })

  test('min length is 3', async () => {
    const invalidUser = {
      username: 'a',
      name: 'Simon',
      password: 'secret'
    }

    const response = await api.post('/api/users').send(invalidUser).expect(400)
    expect(response.body.error).toContain('is shorter than the minimum allowed length (3)')

    await ensureThatNoUserAdded()
  })
})

describe('password', () => {
  test('hash is not returned', async () => {
    const newUser = {
      name: 'Simon',
      username: 'simon',
      password: 'secret'
    }

    const response = await api.post('/api/users').send(newUser)
    expect(response.body.passwordHash).toBeUndefined()
  })

  test('must be given', async () => {
    const invalidUser = {
      username: 'simon',
      name: 'Simon'
    }

    const response = await api.post('/api/users').send(invalidUser).expect(400)
    expect(response.body.error).toContain('password is required')

    await ensureThatNoUserAdded()
  })

  test('min length is 3', async () => {
    const invalidUser = {
      username: 'simon',
      name: 'Simon',
      password: 'x'
    }

    const response = await api.post('/api/users').send(invalidUser).expect(400)
    expect(response.body.error).toContain('password length must be at least 3')

    await ensureThatNoUserAdded()
  })
})
