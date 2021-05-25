
const controller = require('../../nodejs-libs/library/controllers/user')
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy


module.exports = function (app) {
    app.get('/login', controller.get_login)
    app.get('/login_test', controller.login_test)
    app.post('/login_test_login', passport.authenticate('local'), function (req, res) {
        // req.user 中会包含在 deserializeUser 函数中传入的 user 数据
        res.send('local 登录成功');
    })
    //不使用firebase直接使用GitHub登录
    const _github_options = {
        clientID: '722b939ee186f3fade40',
        clientSecret: '81c8eaacc4650b4e5c1373ba5f578509d17a0179',
        callbackURL: "http://192.168.9.225:1300/auth/github/callback"
    }
    passport.use(new GithubStrategy(_github_options, function (accessToken, refreshToken, profile, done){
        console.log('处理逻辑......')
        console.log(accessToken, refreshToken, profile)
        done(null, profile)
    }))

    app.get('/auth/github',
        passport.authenticate('github', { scope: [ 'user:email' ] }),
        function(req, res){
            //该请求将重定向到GitHub进行身份验证，因此这函数不会被调用
        });

    app.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        function(req, res) {
            console.log('登录完成 redirect to home')
            res.redirect('/');
        });


}
