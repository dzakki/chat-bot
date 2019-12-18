const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

// define the home page route
router.get('/', UserController.getUser)
router.post('/', UserController.updateUser)
router.post('/change-password', UserController.changePassword)

module.exports = router