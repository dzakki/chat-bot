var express = require('express')
var router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  res.send('login')
})
// define the about route
router.get('/register', function (req, res) {
  res.send('Register')
})

module.exports = router