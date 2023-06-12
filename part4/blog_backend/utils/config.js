require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  mongoURI: process.env.MONGODB_URI
}