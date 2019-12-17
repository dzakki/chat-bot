const express = require('express')
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true })) 
app.set('view engine', 'ejs');

const { authRoute } = require('./routes')


app.get('/', (req, res) => res.send('Hello World!'))
app.use('/auth', authRoute)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))