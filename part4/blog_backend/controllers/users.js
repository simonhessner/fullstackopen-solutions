const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if(password === undefined) {
    return response.status(400).send({
      'error': 'password is required'
    })
  }

  if(password.length < 3) {
    return response.status(400).send({
      'error': 'password length must be at least 3'
    })
  }

  const existingUser = await User.exists({ username })
  if(existingUser) {
    return response.status(400).send({
      'error': 'user already exists'
    })
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch(error) {
    next(error)
  }
})

module.exports = usersRouter