let isNotLogin = (req, res, next) => {
    if (req.session.isLogin) {
        res.redirect('/bot')
    }else{
        next()
    }
}

module.exports = isNotLogin