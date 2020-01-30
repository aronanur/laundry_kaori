const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const alreadyLogin = require('../middlewares/alreadyLogin')


router.get('/', userController.homePage)
router.get('/logout', userController.doLogout)
router.use('/', alreadyLogin)
router.get('/login', userController.loginPage)
router.post('/login', userController.doLogin)
router.get('/register', userController.registerPage)
router.post('/register', userController.doRegister)



module.exports = router
