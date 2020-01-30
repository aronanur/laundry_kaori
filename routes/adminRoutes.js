const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/transactionController')
const CategoryController=require('../controllers/categoryController')

//filter status

router.get('/', (req, res) => {
    res.send('ini ke home page')
})

router.get('/listTransactions', (req, res) => {
    TransactionController.list(req, res)
})

router.get('/editTransaction/:pay_code', (req, res) => {

    TransactionController.showFormEdit(req, res)
})
router.post('/editTransaction/:pay_code', (req, res) => {

    TransactionController.edit(req, res)
})

router.get('/listCategories', (req, res) => {
    // res.send('ini list cat')
    CategoryController.list(req, res)
})

router.get('/addCategory', (req, res) => {
    // res.send('ini form add')
    CategoryController.showFormAdd(req,res)
})

router.post('/addCategory', (req, res) => {
    // res.send('ini ke add category')
    CategoryController.add(req,res)
})
router.get('/editCategory/:CategoryId', (req, res) => {
    // res.send('ini form ke edit')
    CategoryController.showFormEdit(req,res)
})

router.post('/editCategory/:CategoryId', (req, res) => {
    // res.send('ini ke edit')
    CategoryController.edit(req,res)
})

router.get('/deleteCategory/:CategoryId', (req, res) => {
    // res.send('ini delete aja')
    CategoryController.delete(req,res)
})

module.exports = router