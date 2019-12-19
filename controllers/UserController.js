const { User } = require('../models')
const hashPassword = require('../helper').hashPassword
class UserController {
    static getUser(req, res){
        let opstions = {
            where: {
                id: req.session.userId
            }
        }
        User
            .findOne(opstions)
            .then(user => {
                let msg = {
                    msgErr: req.query.msgErr || null
                }
                res.render('user', {user, msg})
            })
            .catch(errs => {
                res.send(errs)
            })
    }
    static updateUser(req, res){
        let where = {
            where: { id: req.session.userId }   
        }
        User
            .update(req.body, where)
            .then(user => {
                console.log(req.body, '===============')
                req.session.name = req.body.name
                req.session.username = req.body.username
                req.session.email = req.body.email
                req.session.save(function(err) {
                    if (err) {
                        res.send(err)
                    }else{
                        // res.send(req.session)
                        res.redirect('/user?updateProfile=success')
                    }
                })
            })
            .catch(errs => {
                errs.errors.forEach(error => {
                    errors.push(error.message)
                });
                res.redirect('/register?msgErr='+errors)
            })
    }

    static changePassword(req, res){
        if (req.body.newPassword !== req.body.newPasswordVerif) {
            res.redirect('/user?msgErr='+"new password it's not same")
        }else if (req.body.newPassword.length <= 5) {
            res.redirect('/user?msgErr='+"new password minimun is 6")
        }else{
            let options = {
                where: {
                    id: req.session.userId
                }
            }
            User
                .findOne(options)
                .then(user => {
                    let oldPassword = hashPassword(user.secret, String(req.body.oldPassword))
                    let newPassword = {
                        password:  String(req.body.newPassword)
                    }
                    options.individualHooks =  true
                    console.log(oldPassword,  req.body.oldPassword , user.password)
                    if (oldPassword === user.password) {
                       return User.update(newPassword, options)       
                    }else{
                        res.redirect('/user?msgErr='+"old password it's wrong")
                    }
                })
                .then(user => {
                    // res.send(user)
                    res.redirect('/auth?changePassword=success')
                })
                .catch(errs => {
                    // console.log(errs)
                    res.send(errs)
                })
        }
    }
}


module.exports = UserController