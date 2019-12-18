const express = require('express')
const router = express.Router()
// const AuthController = require('../controllers/AuthController')
const Languange = require('../models').Languange
const UserLanguange = require('../models').UserLanguange
const LangController = require('../controllers/langController')
// router.get('/', AuthController.getAll)
// define the home page route
router.get('/', LangController.showAllLang)

router.post('/', LangController.postUserLang)

module.exports = router