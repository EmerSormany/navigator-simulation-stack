const express = require('express')
const { routes } = require('./routes/routes')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(3000, () => console.log('http://localhost:3000'))