const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

exports.get_login = function (req, res, next) {
    res.render('user_login')
}
exports.login_test = function (req, res, next) {
    res.render('login_test')
}







