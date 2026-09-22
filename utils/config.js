const PORT = 3003;
const password = 'rootpassword'
const MONGODB_URI = `mongodb://root:${password}@localhost:27017`;
const SECRET = 'myawesomesecret'

module.exports = {
  SECRET,
  MONGODB_URI,
  PORT
}