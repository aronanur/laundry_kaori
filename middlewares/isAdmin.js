module.exports = (req, res, next) => {
    // console.log(req.session.user)
    if (req.session.admin) {
        next()
    } else {
        req.flash('error', ['Anda bukan Admin'])
        res.redirect('/admins/login')
    }
}