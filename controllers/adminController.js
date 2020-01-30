'use strict'
const { Transaction } = require('../models')

class AdminController {
    static listTransactions(req, res) {
        Transaction
            .findAll()
            .then(transactions => {

                res.render('admin/listTransactions', { transactions })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static showFormEditTransaction(req, res) {
        Transaction
            .findOne({
                where: {
                    pay_code: req.params.pay_code
                },
                hooks: false
            })
            .then(transaction => {
                res.render('admin/editTransaction', { transaction })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static editTransaction(req, res) {
        console.log(req.body)
        Transaction
            .update(req.body, {
                where: {
                    pay_code: req.params.pay_code
                },
                hooks: false
                // individualHooks:true
            })
            .then(transaction => {
                res.redirect('/admins/listTransactions')
                // res.send(transaction)
            })
            .catch(err => {
                res.send(err)
            })
    }
    static deleteTransaction(req, res) {
        Transaction
            .destroy({
                where: {
                    pay_code: req.params.pay_code
                }
            })
            .then(() => {
                res.redirect('/admins/listTransactions')
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = AdminController