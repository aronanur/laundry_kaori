'use strict'
const { Transaction, Parfume, Category } = require('../models')

class AdminController {
    static listTransactions(req,res) {
        Transaction
        .findAll()
        .then(data=>{
            res.send(data)
        })
    }
}

module.exports = AdminController