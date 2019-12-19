const { User } = require('../../models')

class AdminController{
    static showTable(req,res){
        User.findAll({order: [['id', 'asc']]})
        .then(data=>{
            let msg = req.query.msg
            res.render('admin/admin',{data:data, msg:msg})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static deleteUser(req,res){
        let id = req.params.id
        User.destroy({where : {id:id}})
        .then(() => {
            res.redirect('/admin?msg='+'User has been deleted!')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = AdminController