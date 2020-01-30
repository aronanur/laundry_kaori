'use strict'
const { Category, Parfume } = require('../models')
const Helper = require('../helper/helper')

class CategoryController {
    static list(req, res) {
        Category

            .findAll({
                include: Parfume
            })
            .then(categories => {

                res.render('admin/listCategories', { categories })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static showFormAdd(req, res) {
        Parfume
            .findAll()
            .then(parfumes => {

                res.render('admin/addCategory', { category: {}, parfumes, errMsg: [] })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static add(req, res) {

        Category
            .create(req.body)
            .then(category => {
                res.redirect('/admins/listCategories')
            })
            .catch(err => {

                req.flash('error', Helper.formValidator(err.errors))
                res.redirect('/admins/addCategory')
            })
    }
    static showFormEdit(req, res) {

        Promise.all([Category.findByPk(req.params.CategoryId), Parfume.findAll()])
            .then(data => {

                res.render('admin/editCategory', { category: data[0], parfumes: data[1], errMsg: [] })
            })

            .catch(err => {
                res.send(err)
            })
    }
    static edit(req, res) {

        Category
            .update(req.body, {
                where: {
                    id: req.params.CategoryId
                },
            })
            .then(category => {
                res.redirect('/admins/listCategories')
            })
            .catch(err => {
                req.flash('error', Helper.formValidator(err.errors))
                res.redirect('/admins/editCategory')
            })
    }
    static delete(req, res) {

        Category
            .destroy({
                where: {
                    id: Number(req.params.CategoryId)
                }
            })
            .then(category => {
                res.redirect('/admins/listCategories')
            })
            .catch(err => {
                res.send(err)
            })
    }
}
module.exports = CategoryController