const { User, Category, Parfume, Transaction } = require('../models/index')
const Operator = require('sequelize').Sequelize.Op
const Helper = require('../helper/helper')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const mailSetup = require('../helper/mailSetup')

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
            mailSetup
                  // setup email data with unicode symbols
            let mailOptions = {
              from: '"Nodemailer Contact" <kaorilaundry8@email.com>', // sender address
              to: 'arona.nur.tetulis@gmail.com', // list of receivers
              subject: 'Tes', // Subject line
              text: 'Hello world?', // plain text body
              html: 'tes email' // html body
            };
            // send mail with defined transport object
            mailSetup.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
              //   res.render('contact', {msg:'Email has been sent'});
            });
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

    static cartList(req, res){
      let UserId = req.params.id
      let status = req.query.status

      Transaction
        .findAll({
          include : [User, Category],
          where : {
            UserId : UserId
          }
        })
        .then(response => {
          const checkoutValidasi = Helper.checkoutValidasi(response)
          res.render('user/cartList', { pakets : response, isLogin : req.session.isLogin, status, rows : checkoutValidasi })
          // res.send(response)
        })
        .catch(err => {
          res.send(err)
        })
    }

    static updateDatapage(req, res){
      let payCode = req.params.payCode
      let status = req.query.status

      Transaction
        .findOne({
          where : {
            pay_code : payCode
          }
        })
        .then(response => {
          // res.send(response)
          res.render('user/editDataTransaksi', { paket : response, isLogin : req.session.isLogin, status })
        })
        .catch(err => {
          res.send(err)
        })
    }

    static updateDataTransaksi(req, res){
      let pay_code = req.params.payCode
      let objValue = {
        CategoryId : req.params.CategoryId,
        qty : req.body.qty,
        notes : req.body.notes,
        pay_code : pay_code,
        total_price : 0,
        status : 'Belum Lunas'
      }
      
      Transaction
        .update(objValue, {
          where : {
            pay_code : pay_code,
          },
          individualHooks: true
        })
        .then(response => {
          req.flash('success', 'Berhasil update data!')
          res.redirect('/laundry/carts/'+req.session.user.id)
        })
        .catch(err => {
          res.send(err)
        })
    }

    static deleteDataTransaksi(req, res){
      Transaction
        .destroy({
          where : {
            pay_code : req.params.payCode
          }
        })
        .then(response => {
          req.flash('success', 'Berhasil hapus data!')
          res.redirect('/laundry/carts/'+req.session.user.id)
        })
        .catch(err => {
          res.send(err)
        })
    }

    static checkoutInvoice(req, res){
      let statusData = req.params.statusData
      let status =  req.query.status

      if(statusData === 'single'){
        Transaction
        .findAll({
          include : [User, Category],
          where : {
            pay_code : req.params.id
          },
        })
        .then(response => {
          let total = Helper.sumTotalPrice(response)
          console.log(response[0].pay_code)
          res.render('user/checkoutInvoice', { id : response[0].pay_code, pakets : response, isLogin : req.session.isLogin, status, totals : total, statusData : statusData })
        })
        .catch(err => {
          res.send(err)
        })
      }else{
        Transaction
        .findAll({
          include : [User, Category],
          where : {
            UserId : req.params.id,
            status : 'Belum Lunas'
          },
          sum : 'total_price'
        })
        .then(response => {
          let total = Helper.sumTotalPrice(response)
          res.render('user/checkoutInvoice', { id : response[0].UserId,  pakets : response, isLogin : req.session.isLogin, status, totals : total, statusData : statusData })
        })
        .catch(err => {
          res.send(err)
        })
      }
    }

    static finalTransaksi(req, res){
      let statusData = req.params.statusData
      let status =  req.query.status

      let objValue = {
        status : 'Invoice Terkirim',
        invoice : req.body.invoice
      }

      if(statusData === 'single'){
        Transaction
          .update(objValue, {
            where : {
              pay_code : req.params.id
            },
            hooks : false
          })
          .then(response => {
            res.render('user/success', { isLogin : req.session.isLogin })
          })
          .catch(err => {
            res.send(err)
          })
      }else{
        Transaction
          .update(objValue, {
            where : {
              UserId : req.params.id,
              status : 'Belum Lunas'
            },
            hooks : false
          })
          .then(response => {
            res.render('user/success', { isLogin : req.session.isLogin })
          })
          .catch(err => {
            res.send(err)
          })
      }
    }
    
}

module.exports = UserController