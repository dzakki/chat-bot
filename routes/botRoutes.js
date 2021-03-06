const express = require('express')
const router = express.Router()
const BotController = require('../controllers/botController')

router.get('/', BotController.getBot)
router.post('/', (req, res) => {
    BotController.addBot(req, res)
})
router.get('/delete-history', BotController.deleteHistoryChat)
router.get('/backup-history', BotController.backUpChat)
module.exports = router