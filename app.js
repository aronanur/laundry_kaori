const express = require('express')
const app = express()
const port = 3000
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const routerAdmin = require('./routes/adminRoutes')

app.use(express.static('assets'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.locals.formatRupiah = require('./helper/formatRupiah')
app.locals.formatTanggal =require('./helper/formatTanggal')
  // app.use(flash())
  // app.use(cookieParser('keyboard cat'))
  // app.use(session({
  //     secret: 'keyboard cat',
  //     resave: false,
  //     saveUninitialized: true,
  //   }))

  // app.use(session())
app.set('view engine', 'ejs')

app.use('/admins', routerAdmin)
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})