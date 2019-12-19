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
        if (!req.body.LanguangesId) {
            res.redirect('/bot')
        }else{
            let data = []
            req.body.LanguangesId.forEach(LanguangeId => {
                data.push({
                    LanguangeId: LanguangeId,
                    UserId: req.session.userId
                })
            });
            UserLanguange
                .bulkCreate(data)
                .then(userLanguange => {
                    // res.send(userLanguange) 
                    res.redirect('/bot')
                })
                .catch(errs => {
                    res.send(errs) 
                })
        }
    }
}

module.exports = LangController