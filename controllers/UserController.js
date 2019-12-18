const { User } = require('../models')
const hashPassword = require('../helper').hashPassword
class UserController {
    static getUser(req, res){
        let opstions = {
            where: {
                id: 1
            }
        }
        User
            .findOne(opstions)
            .then(user => {
                let msg = {
                    msgPassErr: req.params.msgPassErr || null
                }
                res.render('user', {user, msg})
            })
            .catch(errs => {
                res.send(errs)
            })
    }
    static updateUser(req, res){
        let where = {
            where: { id: 1 }   
        }
        User
            .update(req.body, where)
            .then(user => {
                res.redirect('/user?updateProfile=success')
            })
            .catch(errs => {
                res.send(errs)
            })
    }

    static changePassword(req, res){
        if (req.body.newPassword !== req.body.newPasswordVerif) {
            res.redirect('/user?msgPassErr='+"new password it's not same")
        }else if (req.body.newPassword.length <= 5) {
            res.redirect('/user?msgPassErr='+"new password minimun is 6")
        }
        let options = {
            where: {
                id: 1
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
                    res.redirect('/user?msgPassErr='+"old password it's wrong")
                }
            })
            .then(user => {
                // res.send(user)
                res.redirect('/auth?changePassword=success')
            })
            .catch(errs => {
                console.log(errs)
                res.send(errs)
            })
    }
}


module.exports = UserController