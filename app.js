const express = require('express')
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true })) 
app.set('view engine', 'ejs');

const { authRoute, languangeRoute } = require('./routes')
const BotController = require('./controllers/botController')

app.get('/', (req, res) => {
    res.send(`
        <form method="post">
        <input type="submit" value="submit">
        </form>
    `)
})
app.post('/', (req, res) => {
    BotController.addBot(req, res)
})

app.use('/languange', languangeRoute)

app.use('/auth', authRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))