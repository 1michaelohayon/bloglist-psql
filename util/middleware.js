const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { User, ValidToken } = require('../models')
const { response } = require('express')

const errorHandler = (error, request, response, next) => {
  console.error('ERROR MESSAGE:', error.message)

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({
      error: error.message
    })
  } else if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({
      error: error.message
    })
  }
  next()
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  const userId = req.decodedToken.id
  const session = await ValidToken.findOne({
    where: {
      user_id: userId
    }
  })


  if (!session || authorization.substring(7) !== session.token) {
    return res.status(401).json({ error: 'seassion is expired' }).end()
  }

  req.user = await User.findByPk(req.decodedToken.id)
  if (req.user.disabled) {
    await ValidToken.destroy({
      where: {
        user_id: userId
      }
    })
    return res.status(401).json({ error: `user: ${req.user.username} is disabled.` }).end()

  }


  next()
}



module.exports = {
  errorHandler,
  tokenExtractor
}