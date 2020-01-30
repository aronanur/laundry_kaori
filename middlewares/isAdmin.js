module.exports = (req, res, next) => {
    console.log(req.session)
    if (req.session.admin && req.session.admin.role=='admin') {
        next()
    } else {
        req.flash('error', ['Anda bukan Admin'])
        res.redirect('/admins/login')
    }
}