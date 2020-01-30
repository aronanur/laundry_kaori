const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const alreadyLogin = require('../middlewares/alreadyLogin')
const isLogin = require('../middlewares/isLoggedIn')


router.get('/', userController.homePage)
router.get('/logout', userController.doLogout)
router.get('/login', alreadyLogin,userController.loginPage)
router.post('/login', alreadyLogin,userController.doLogin)
router.get('/register', alreadyLogin,userController.registerPage)
router.post('/register', alreadyLogin,userController.doRegister)

router.get('/laundry/:id', isLogin ,userController.addTransactionsPage)



module.exports = router
