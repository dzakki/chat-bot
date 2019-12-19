const request = require('request')
const nodemailer = require('nodemailer');
const { bot, User, Languange } = require('../models')
const Bot = bot
class BotController {

    static addBot(req, res){
        let quest = req.body.question
        let lang = req.body.langKode || 'id'
        req.session.language =  lang
        BotController.beforeAdd(quest, lang)
                     .then(body => {
                        let answer = body.atext
                        let quest = body.request.utext
                        if (body.status === 228) {
                            answer = body.statusMessage
                        }
                        let params = {
                            question: quest,
                            answer: answer,
                            UserId: req.session.userId
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
        console.log('===========beforeAdd')
        const options = {
            url: 'https://wsapi.simsimi.com/190410/talk?utext='+quest+'&lang='+lang,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'e1ahogKw6pIHs4Q4cgWDfgV710m5WfWFSBeiIVhG'
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
            id: req.session.userId
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
                    UserId: req.session.userId
                }
                return Bot.findAll({ where : where})
            })
            .then(bots => {
                // res.send(historyBots)
                res.render('bot/bot', { langs: $langs, bots, checkedLang: req.session.language})
            })
            .catch(errs => {
                res.send(errs)
            })
    }

    static deleteHistoryChat(req, res){
        let where = {
            UserId: req.session.userId
        }
        Bot.destroy({where : where})
        .then(() => {
            res.redirect('/bot')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static backUpChat(req, res) {
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    // should be replaced with real sender's account
                    user: 'dzakkiaz7@gmail.com',
                    pass: '+_)*^&))&$#)*('
                }
            });
            let fillTable = ""
            let htmlMsg = `<table border='1'>  
                            <thead>  
                                <tr>
                                    <th>Bot</th>
                                    <th>You</th>
                                </tr>
                            </thead> 
                            <tbody>`
                
            Bot.findAll({ where : {UserId: req.session.userId}})
            .then(bots => {
                // res.send(bots)
                bots.forEach(bot => {
                    console.log(bot)
                    fillTable += `<tr>
                                    <td>
                                        ${bot.answer}
                                    </td>
                                    <td>
                                        ${bot.question}
                                    </td>
                                 </tr>`
                });
                htmlMsg += fillTable + '</tbody> </table>'
                let mailOptions = {
                    from: 'dzakkiaz7@gmail.com',
                    to: req.session.email, // Recepient email address. Multiple emails can send separated by commas
                    subject: 'Backup chat bot',
                    html: htmlMsg
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.redirect('/bot?error='+'gmail is not valid')
                    }else{
                        console.log(info)
                        res.redirect('/bot?success='+'backup chat success')
                    }
                });
            })
            .catch(errs => {
                res.send(errs)
            })
        });
    }
}
module.exports = BotController