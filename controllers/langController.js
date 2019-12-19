const Languange = require('../models').Languange
const UserLanguange = require('../models').UserLanguange

class LangController{
    static showAllLang(req,res){
        Languange.findAll({
            order: [
                ['name', 'ASC']
            ],
         })
         .then(langs => {
            let msg = (req.query.msgSuccess)
            // res.send(langs)
            res.render('languange', { langs:langs, msg:msg })
         })
         .catch(errs => res.send(errs))
    }

    static postUserLang(req,res){
        let data = []
        req.body.LanguangesId.forEach(LanguangeId => {
            data.push({
                LanguangeId: LanguangeId,
                UserId: 1
            })
        });
        UserLanguange
            .bulkCreate(data)
            .then(userLanguange => { 
                res.redirect('/')
            })
            .catch(errs => {
                res.send(errs) 
            })
        }
}

module.exports = LangController