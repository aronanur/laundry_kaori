const { User, Category, Parfume, Transaction } = require('../models/index')
const Operator = require('sequelize').Sequelize.Op
const Helper = require('../helper/helper')
const bcrypt = require('bcryptjs')

class UserController {

    static homePage(req, res){
      
      let status = req.query.status

      Category
        .findAll({
          include : Parfume,
          limit : 4
        })
        .then(response => {
          res.render('user/home', { isLogin : req.session.isLogin, status, pakets : response })
        })
        .catch(err => {
          res.send(err)
        })

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
            res.send(err)
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

    static addTransactionsPage(req, res){
      let status = req.query.status

      Category
        .findOne({
          include : Parfume,
          where : {
            id : req.params.id
          }
        })
        .then(response => {
          // res.send(response)
          res.render('user/form_laundry', { isLogin : req.session.isLogin, status, paket : response })
        })
        .catch(err => {
          res.send(err)
        })
    }

    static addTransactionsToCart(req, res){
      let objValue = {
        UserId : req.params.UserId,
        CategoryId : req.params.CategoryId,
        status : 'Unhandled',
        qty : 0,
        total_price : 0,
        pay_code : '',
        start_date: '',
        end_date: '',
      }

      Transaction
        .create(objValue)
        .then(response => {
          req.flash('success', 'Berhasil memasukan data transaksi ke cart!')
          res.redirect('/laundry/'+req.params.CategoryId)
        })
        .catch(err => {
          res.send(err)
        })
    }

    static checkoutSingleTransaction(req, res){
      let objValue = {
        UserId : req.params.UserId,
        CategoryId : req.params.CategoryId,
        status : 'Belum Lunas',
        qty : req.body.qty,
        notes : req.body.notes,
        total_price : 0,
        pay_code : '',
        start_date: '',
        end_date: '',
      }

      Transaction
      .create(objValue)
      .then(response => {
        req.flash('success', 'Berhasil checkout transaksi')
        res.redirect('/laundry/'+req.params.CategoryId)
      })
      .catch(err => {
        res.send(err)
      })
    }

    static paketList(req, res){
      let query = req.query.name

      if(!query){
        Category
        .findAll({
          include : Parfume
        })
        .then(response => {
          res.render('user/paketList', { isLogin : req.session.isLogin, pakets : response })
        })
        .catch(err => {
          res.send(err)
        })
      }else{
        Category
        .findAll({
          include : Parfume,
          where : {
            name : {
              [Operator.like] : `%${query}%`
            }
          }
        })
        .then(response => {
          res.render('user/paketList', { isLogin : req.session.isLogin, pakets : response })
        })
        .catch(err => {
          res.send(err)
        })
      }
    }

    // static cartList(req, res){
    //   Category
    // }
}

module.exports = UserController