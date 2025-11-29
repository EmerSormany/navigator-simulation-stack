const express = require('express')
const { routes } = require('./routes/routes')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()
const app = express()

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(3000, () => console.log('http://localhost:3000'))