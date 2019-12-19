const { User } = require('../../models')

class AdminController{
    static showTable(req,res){
        User.findAll({order: [['id', 'asc']]})
        .then(data=>{
            res.render('admin/admin',{data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static deleteUser(req,res){
        let id = req.params.id
        User.destroy({where : {id:id}})
        .then(() => {
            res.redirect('/admin')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = AdminController