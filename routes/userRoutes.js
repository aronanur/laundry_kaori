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

router.get('/laundry/list' ,userController.paketList)
router.get('/laundry/carts/:id',isLogin, userController.cartList)
router.get('/laundry/updateDataTransaksi/:payCode/:CategoryId', isLogin, userController.updateDatapage)
router.post('/laundry/updateDataTransaksi/:payCode/:CategoryId', isLogin, userController.updateDataTransaksi)
router.get('/laundry/deleteDataTransaksi/:payCode', isLogin, userController.deleteDataTransaksi)
router.get('/laundry/:id', isLogin ,userController.addTransactionsPage)
router.get('/laundry/addToCart/:UserId/:CategoryId', isLogin ,userController.addTransactionsToCart)
router.post('/laundry/checkoutSingle/:UserId/:CategoryId', isLogin ,userController.checkoutSingleTransaction)
router.get('/laundry/checkoutInvoice/:id/:statusData', isLogin, userController.checkoutInvoice)
router.post('/laundry/updateInvoiceStatus/:id/:statusData', isLogin, userController.finalTransaksi)



module.exports = router
