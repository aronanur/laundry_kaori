const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

//liat list transaction, filter status

router.get('/', (req, res) => {
    res.send('ini ke home page')
})

router.get('/listTransactions', (req, res) => {
    adminController.listTransactions(req, res)
})
router.get('/filter?',(req,res)=>{
    res.send('ini filter')
})

router.get('/editTransaction/:pay_code', (req, res) => {
   
    adminController.showFormEditTransaction(req,res)
})
router.post('/editTransaction/:pay_code', (req, res) => {
   
    adminController.editTransaction(req,res)
})

router.get('/deleteTransaction/:pay_code',(req,res)=>{
    // res.send('ini delete trans')
    adminController.deleteTransaction(req,res)
    
})

router.get('/addCategory', (req, res) => {
    res.send('ini form add')
})

router.post('/addCategory', (req, res) => {
    res.send('ini ke add category')
})
router.get('/editCategory/:CategoryId', (req, res) => {
    res.send('ini form ke edit')
})
router.post('/editCategory/:CategoryId', (req, res) => {
    res.send('ini ke edit')
})

router.get('/delete/:CategoryId', (req, res) => {
    res.send('ini delete aja')
})

module.exports = router