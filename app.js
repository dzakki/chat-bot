const express = require('express')
const session = require('express-session')
const app = express()
const port = 3000
app.use(session({
  secret: 'secretfox',
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true })) 
app.set('view engine', 'ejs');

const { authRoute, languangeRoute, botRoute, userRoute, adminRoute } = require('./routes')

const isLogin = require('./middlewares/isLogin')
app.use('/', authRoute)

app.use(isLogin)
app.use('/admin', adminRoute)

app.use('/bot', botRoute)

app.use('/languange', languangeRoute)


app.use('/user', userRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))