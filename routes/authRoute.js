const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

// router.get('/', AuthController.getAll)
// define the home page route
router.get('/', function (req, res) {
    let options = {
        errors: req.query.msgError || null
    }
    res.render('auth/login', options)
})
router.post('/', AuthController.login)
// define the about route
router.get('/register', function (req, res) {
    let options = {
        errors: req.query.msgError || null
    }
    res.render('auth/register', options)
})
router.post('/register', AuthController.register)

module.exports = router