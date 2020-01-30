const express = require('express')
const app = express()
const port = 5000
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')
app.use(express.static('assets'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.locals.formatRupiah = require('./helper/formatRupiah')
app.locals.formatTanggal =require('./helper/formatTanggal')
app.locals.moment = require('moment')

app.locals.user = ''
app.use(flash())
app.use(cookieParser('keyboard cat'))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.set('view engine', 'ejs')
app.use('/', userRoutes)

app.use('/admins', adminRoutes)
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})