const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    service: 'gmail',
    logger: true,
    debug:true,
    auth: {
        user: 'kaorilaundry8@gmail.com', // generated ethereal user
        pass: 'kaori8laundry'  // generated ethereal password
    }
});
