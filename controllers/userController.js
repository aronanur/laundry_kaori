const { User, Category, Parfume, Transaction } = require('../models/index')
const Helper = require('../helper/helper')
const bcrypt = require('bcryptjs');

class UserController {

    static homePage(req, res){
      let status = req.query.status
        res.render('user/home', { isLogin : req.session.isLogin, status })
    }

    static loginPage(req, res){
        res.render('user/login')
    }

    static registerPage(req, res){
        res.render('user/register')
    }

    static doLogin(req, res){
      let email = req.body.email
      let password = req.body.password
        User
          .findOne({
            where : {
              email : email
            }
          })
          .then(response => {
            if(bcrypt.compareSync(password, response.password)){
              req.session.user = {
                id : response.id,
                email : response.email,
                role : response.role,
                isLogin : true
              }
              req.session.isLogin = true
              req.app.locals.user = req.session.user
              res.redirect('/')
            }else{
              req.flash('error','Email atau password salah!')
              res.redirect('/login')
            }
          })
          .catch(err => {
           req.flash('error','Email tidak terdaftar!')
           res.redirect('/login')
          })
    }

    static doRegister(req, res){
        let objValue = {
            name: req.body.name,
            password: req.body.password,
            phone:req.body.name,
            email:req.body.email,
            address:req.body.address,
            gender:req.body.gender,
            role : 'user'
        }

        User
          .create(objValue)
          .then(response => {
            req.flash('success', 'Sukses membuat akun Kaori Laundry')
            res.redirect('/login')
          })
          .catch(err => {
            req.flash('error', Helper.formValidator(err.errors))
            res.redirect('/register')
          })
    }

    static doLogout(req, res){
          req.session.destroy(function(err) {
            if(!err){
              res.redirect('/?status=Anda berhasil logout')
            }
          })
    }



}

module.exports = UserController