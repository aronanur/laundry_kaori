const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/transactionController')
const CategoryController = require('../controllers/categoryController')
const AdminController = require('../controllers/adminController')
const alreadyLogin = require('../middlewares/alreadyLogin')
// const isLogin = require('../middlewares/isLoggedIn')
const isAdmin = require('../middlewares/isAdmin')

router.get('/logout', AdminController.doLogout)
router.get('/login', alreadyLogin, AdminController.loginPage)
router.post('/login', alreadyLogin, AdminController.doLogin)

router.use('/',isAdmin)

router.get('/', (req, res) => {
    // res.send('homeeee
    res.render('admin/homeAdmin')
})


router.get('/listTransactions', TransactionController.list)

router.get('/editTransaction/:pay_code', TransactionController.showFormEdit)
router.post('/editTransaction/:pay_code', TransactionController.edit)
router.get('/deleteTransaction/:pay_code', TransactionController.delete)


router.get('/listCategories', CategoryController.list)

router.get('/addCategory', CategoryController.showFormAdd)

router.post('/addCategory', CategoryController.add)
router.get('/editCategory/:CategoryId', CategoryController.showFormEdit)

router.post('/editCategory/:CategoryId', CategoryController.edit)

router.get('/deleteCategory/:CategoryId', CategoryController.delete)

module.exports = router