const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/AuthController')

// router.get('/', AuthController.getAll)
// define the home page route
const isNotLogin = require('../middlewares/isNotLogin')

router.get('/', isNotLogin ,function (req, res) {
    let options = {
        errors: req.query.msgError || null
    }
    res.render('auth/login', options)
})
router.post('/', AuthController.login)
// define the about route
router.get('/register' , isNotLogin ,function (req, res) {
    let options = {
        errors: req.query.msgError || null
    }
    res.render('auth/register', options)
})
router.post('/register', AuthController.register)
router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
        // cannot access session here
    })
    res.redirect('/')
})

module.exports = router