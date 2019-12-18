const { User } = require('../models')
const hashPassword = require('../helper').hashPassword
class AuthController{
    static getAll(req, res){
        User.findAll()
            .then(users => {
                res.send(users)
            })
            .catch(errs => {
                res.send(errs)
            })
    }
    static login(req, res){
        
        User
            .getUserByEmailOrUsername(req.body.emailOrUsername)
            .then(user => {
                if (user) {
                    let password = hashPassword(user.secret, req.body.password)
                    if (password === user.password) {
                        res.redirect('/bot')   
                    }
                }
                res.redirect('/?msgError=' + 'email or password wrong')   
            })
            .catch(errs => {
                console.log(errs)
                res.send(errs)
            })
    }
    static register(req, res){
        console.log(req.body)
        let params = req.body
        User
            .create(params)
            .then(student => {
                res.redirect('/languange?msgSuccess='+req.body.name)
            })
            .catch(errs => {
                let errors = []
                errs.errors.forEach(error => {
                    errors.push(error.message)
                });
                res.redirect('/languange')
            })
    }
}

module.exports = AuthController