const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers')


router.get('/', (req, res) => {
    res.render('user/home')
})

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.get('/register', (req, res) => {
    res.render('user/register')
})


module.exports = router
