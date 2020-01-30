const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

//liat list transaction, filter status

router.get('/', (req, res) => {
    res.send('ini ke home page')
})

router.get('/listTransactions', (req, res) => {
    // res.send('ini ke list transaksi')
    adminController.listTransactions(req,res)
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
    res.send('ini delete yg udah')
})

module.exports = router