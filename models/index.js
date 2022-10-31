const Blog = require('./blog')
const User = require('./user')
const ReadingLists = require('./reading_list')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings'})
Blog.belongsToMany(User, { through: ReadingLists, as: 'user_readings'})


module.exports = {
  Blog, User, ReadingList: ReadingLists
}