'use strict'
const { Transaction } = require('../models')
const mailSetup=require('../helper/mailSetup')

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
                mailSetup
                  // setup email data with unicode symbols
            let mailOptions = {
              from: '"Nodemailer Contact" <kaorilaundry8@email.com>', // sender address
              to: 'isnirof.ir@gmail.com', // list of receivers
              subject: 'Tes', // Subject line
              text: 'We have update your laundry status', // plain text body
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
            req.flash('success', 'Berhasil update transaksi')
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
                req.flash('success', 'Berhasil hapus transaksi')
                res.redirect('/admins/listTransactions')
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = TransactionController