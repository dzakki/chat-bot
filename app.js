const express = require('express')
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true })) 
app.set('view engine', 'ejs');

const { authRoute, languangeRoute, botRoute } = require('./routes')
const BotController = require('./controllers/botController')

app.use('/bot', botRoute)

app.use('/languange', languangeRoute)

app.use('/auth', authRoute)

app.use('/user', userRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))