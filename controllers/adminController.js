'use strict'
const { User } = require('../models')

class AdminController {
    static loginPage(req, res) {
        res.render('admin/loginAdmin')
        // res.send('masuuuuk')
    }

    static doLogin(req, res) {
        // console.log(req.body)
        let email = req.body.email
        let password = req.body.password
        User
            .findOne({
                where: {
                    email: email,
                    password: password
                }
            })
            .then(response => {
                req.session.admin = {
                    id: response.id,
                    email: response.email,
                    role: 'admin',
                    isLogin: true
                }
                console.log(req.session.admin)
                res.redirect('/admins')
            })
            .catch(err => {
                req.flash('error', 'Email atau password salah!')
                res.redirect('/admins/login')
            })
    }
    static doLogout(req, res) {
        req.session.destroy(function (err) {
            if (!err) {
                res.redirect('/?status=Anda berhasil logout')
            }
        })
    }
}
module.exports = AdminController