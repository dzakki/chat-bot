const express = require('express')
const router = express.Router()
// const AuthController = require('../controllers/AuthController')
const Languange = require('../models').Languange
const UserLanguange = require('../models').UserLanguange
// router.get('/', AuthController.getAll)
// define the home page route
router.get('/', function (req, res) {
    Languange.findAll({
                order: [
                    ['name', 'ASC']
                ],
             })
             .then(langs => {
                // res.send(langs)
                res.render('languange', { langs })
             })
             .catch(errs => res.send(errs))
})

router.post('/', function (req, res) {
    let data = []
    req.body.LanguangesId.forEach(LanguangeId => {
        data.push({
            LanguangeId: LanguangeId,
            UserId: 1
        })
    });
    let options = {
        fields: data
        // ignoreDuplicates: true
    }
    UserLanguange
        .bulkCreate(data)
        .then(userLanguange => {
            // res.send(userLanguange) 
            res.redirect('/')
        })
        .catch(errs => {
            res.send(errs) 
        })
})

module.exports = router