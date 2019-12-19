let isLogin = (req, res, next) => {
    if (!req.session.isLogin) {
        res.redirect('/')
    }else{
        next()
    }
}

module.exports = isLogin