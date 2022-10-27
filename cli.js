require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

const main = async () => {
  try {
    // await sequelize.authenticate(); checks for connection prints Executing (default): SELECT 1+1 AS result
    const blogs = await sequelize.query("SELECT * FROM blogs", {type: QueryTypes.SELECT});
    blogInfo(blogs);
  } catch (error) {
    console.log(`Unable to connect to the database: ${error}`);
  };
};

main()


const blogInfo = (blogs) => blogs.forEach(b => {
  const {author, title, likes } = b;
  console.log(`${author}: ${title}, ${likes}, likes`)
});