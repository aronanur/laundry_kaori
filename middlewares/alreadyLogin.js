module.exports = (req, res, next) => {
    if(!req.session.isLogin){
        next()
    }else{
        req.flash('error', ['Anda sudah login'])
        res.redirect('/')
    }    
}
