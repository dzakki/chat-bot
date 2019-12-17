const { Bot } = require('../models')
class BotController {

    static addBot(req, res){
        const request = require('request')
        let quest = 'hai aku jombloe'
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

}
module.exports = BotController