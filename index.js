const express = require('express')
require('express-async-errors')
const middleware = require('./util/middleware')
const app = express()
app.use(express.json());

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const authorsRouter = require('./controllers/authors')
const readingListsRouter = require('./controllers/readinglists')
const logoutRouter = require('./controllers/logout')

app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/readinglists', readingListsRouter);
app.use('/api/logout', logoutRouter);

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    require('dotenv').config()
    console.log(`Server running on port ${PORT}`)
  })
}


start()