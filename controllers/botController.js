const { Bot, User, Languange } = require('../models')
class BotController {

    static addBot(req, res){
        const request = require('request')
        let quest = 'test simi'
        let lang = 'id'
        const options = {
            url: 'https://wsapi.simsimi.com/190410/talk?utext='+quest+'&lang='+lang,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'imPq8OCGxGyfSJSLuueSALuxhx1y+9EvSZ51cecY'
            }
        }
        request.post(options, (error, response, body) => {
            body =  JSON.parse(body)
            let answer = body.atext
            let quest = body.utext
            if (body.status === 228) {
                answer = body.statusMessage
            }
            console.log(body)
        })
    }

    static getBot(req, res){
        let where = {
            id: 1
        }
        User
            .findAll({
                where: where,
                include: [Languange]
            })
            .then(langs => {    
                // res.send(langs)
                res.render('bot/bot', { langs: langs})
            })
            .catch(errs => {
                res.send(errs)
            })
    }

}
module.exports = BotController