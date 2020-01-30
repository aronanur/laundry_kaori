'use strict'
const { Category, Parfume } = require('../models')

class CategoryController {
    static list(req, res) {
        Category
            // .findAllWithFilter(req.query.status)
            .findAll({
                include: Parfume
            })
        // Parfume.findAll()
            .then(categories => {
                res.send(categories)
                // res.render('admin/listTransactions', { transactions })
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
                    id: Number(req.params.id)
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
module.exports = CategoryController