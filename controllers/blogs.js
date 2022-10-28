const router = require('express').Router()

const { Blog } = require('../models')


router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs);
});

router.post('/', async (req, res, next) => {
  try {
    const blogs = await Blog.create(req.body);
    return res.json(blogs);
  } catch (error) {
    next(error)
  }
});



const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
    res.status(204).end();
  } else {
    res.status(404).end();
  }
})

router.put('/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    next()
  }
})

module.exports = router