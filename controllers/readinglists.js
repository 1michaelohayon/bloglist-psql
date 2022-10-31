const router = require('express').Router()
const { Blog, User, ReadingList } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (request, response, next) => {
  const { userId, blogId } = request.body

  try {
    const user = await User.findByPk(userId)
    const blog = await Blog.findByPk(blogId)

    if (!(user)) {
      return response.status(404).json({
        error: `could not find user with the user_id: ${userId}`
      }).end()
    }

    if (!(blog)) {
      return response.status(404).json({
        error: `could not find blog with the blog_id: ${blogId}`
      }).end()
    }


    const newReadingList = await ReadingList.create({
      userId: user.id,
      blogId: blog.id,
      read: false
    });

    return response.json(newReadingList);
  } catch (error) {
    next(error)
  }
});

router.put('/:id', tokenExtractor, async (request, response) => {
  const readingList = await ReadingList.findByPk(request.params.id)
  const { read } = request.body
  const requestingUserId = request.decodedToken.id

  if (!readingList) {
    return response.status(404).end(`reading list ${request.parmas.id} was not found`)
  }
  if (readingList.userId !== requestingUserId) {
    return response.status(401).end(`Operationg not allowed.`)
  }

  readingList.read = read
  await readingList.save()
  response.json(readingList)
})

module.exports = router