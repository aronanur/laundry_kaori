'use strict'
const { Transaction } = require('../models')

class TransactionController {
    static list(req, res) {
        Transaction
            .findAllWithFilter(req.query.status)

            .then(transactions => {
                res.render('admin/listTransactions', { transactions })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static showFormEdit(req, res) {
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
    static edit(req, res) {
        console.log(req.body)
        Transaction
            .update(req.body, {
                where: {
                    pay_code: req.params.pay_code
                },
                hooks: false
            })
            .then(transaction => {
                res.redirect('/admins/listTransactions')
            })
            .catch(err => {
                res.send(err)
            })
    }
    static delete(req, res) {
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

module.exports = TransactionController