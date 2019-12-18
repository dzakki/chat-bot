const { bot, User, Languange, BotHistory } = require('../models')
const Bot = bot
class BotController {

    static addBot(req, res){
        let quest = req.body.question
        let lang = req.body.langKode || 'id'
        BotController.beforeAdd(quest, lang)
                     .then(body => {
                        let answer = body.atext
                        let quest = body.request.utext
                        if (body.status === 228) {
                            answer = body.statusMessage
                        }
                        let id = 1
                        let params = {
                            question: quest,
                            answer: answer,
                            UserId: 1
                        }
                        return Bot.create(params)
                     })
                     .then(sucs => {
                        res.redirect('/bot')
                     })
                     .catch(errs => {
                        console.log('===========err')
                         res.send(errs)
                     })
    }

    static beforeAdd(quest, lang){
        const request = require('request')
        console.log('===========beforeAdd')
        const options = {
            url: 'https://wsapi.simsimi.com/190410/talk?utext='+quest+'&lang='+lang,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'imPq8OCGxGyfSJSLuueSALuxhx1y+9EvSZ51cecY'
            }
        }
        return new Promise((resolve, rej) => {
            request.post(options, (error, response, body) => {
                body =  JSON.parse(body)
                if (body.status === 200 || body.status === 228) {
                    resolve(body)
                }else{
                    rej(error)
                }
            })  
        })
    }

    static getBot(req, res){
        let where = {
            id: 1
        }
        let $langs = null
        User
            .findAll({
                where: where,
                order: [
                    ['name', 'ASC'],
                ],
                include: [Languange]
            })
            .then(langs => {    
                // res.send(langs)
                $langs = langs
                let where = {
                    UserId: 1
                }
                return Bot.findAll({ where : where})
            })
            .then(bots => {
                // res.send(historyBots)
                res.render('bot/bot', { langs: $langs, bots})
            })
            .catch(errs => {
                res.send(errs)
            })
    }

}
module.exports = BotController