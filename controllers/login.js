const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User, ValidToken } = require('../models')

router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })


  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }


  if (user.disabled) {
    return response.status(401).json({
      error: `user: ${user.username} is disabled.`
    })
  }

  const existingSession = await ValidToken.findOne({
    where: {
      user_id: user.id
    }
  })

  if (existingSession) {
    return response.status(200).send({ token: existingSession.token })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }
  console.log(user.id)
  const token = jwt.sign(userForToken, SECRET)
  await ValidToken.create({ user_id: user.id, token });


  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router