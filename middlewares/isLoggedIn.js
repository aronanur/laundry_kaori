module.exports = (req, res, next) => {
    if(req.session.isLogin){
        next()
    }else{
        req.flash('error', ['Anda belum login'])
        res.redirect('/login')
    }    
}