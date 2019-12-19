const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin/userController')

// router.get('/', AuthController.getAll)
// define the home page route
router.get('/', AdminController.showTable)

router.get('/:id/delete', AdminController.deleteUser)
// router.post('/', AuthController.login)
// // define the about route
// router.get('/register', function (req, res) {
//     let options = {
//         errors: req.query.msgError || null
//     }
//     res.render('auth/register', options)
// })
// router.post('/register', AuthController.register)

module.exports = router