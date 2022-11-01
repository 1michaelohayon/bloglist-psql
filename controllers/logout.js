const router = require('express').Router()
const { tokenExtractor } = require('../util/middleware')
const { ValidToken } = require('../models')

router.post('/', tokenExtractor, async (req, res) => {
  await ValidToken.destroy({
    where: {
      user_id: req.user.id
    }
  })

  res
    .status(200)
    .send('session ended.')
})

module.exports = router