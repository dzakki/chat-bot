const { User } = require('../models')
const hashPassword = require('../helper').hashPassword
class AuthController{
    static login(req, res){
        User
            .getUserByEmailOrUsername(req.body.emailOrUsername)
            .then(user => {
                if (user) {
                    let password = hashPassword(user.secret, req.body.password)
                    if (password === user.password) {
                        req.session.userId = user.id
                        req.session.name = user.name
                        req.session.username = user.username
                        req.session.email = user.email
                        req.session.language = 'id'
                        req.session.isLogin = true
                        req.session.save(function(err) {
                            if (err) {
                                res.send(err)
                            }else{
                                res.redirect('/bot')
                            }
                        })
                    }else{
                        res.redirect('/?msgError=' + 'email or password wrong')   
                    }
                }else{
                    res.redirect('/?msgError=' + 'email or password wrong')   
                }
            })
            .catch(errs => {
                res.send(errs)
            })
    }
    static register(req, res){
        let params = req.body
        User
            .create(params)
            .then(user => {
                req.session.userId = user.id
                req.session.name = user.name
                req.session.username = user.username
                req.session.email = user.email
                req.session.language = 'id'
                req.session.isLogin = true
                req.session.save(function(err) {
                    if (err) {
                        res.send(err)
                    }else{
                        res.redirect('/languange?msgSuccess='+req.body.name)
                    }
                })
            })
            .catch(errs => {
                let errors = []
                if(Array.isArray(errs.errors)){
                    errs.errors.forEach(error => {
                        errors.push(error.message)
                    });
                    res.redirect('/register?msgError='+errors)
                }else{
                    console.log('=============errs')
                    res.send(errs)
                }
            })
    }
}

module.exports = AuthController
