const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const GitHubStrategy = require('passport-github2').Strategy
const GitHubStrategy = require('passport-github2').Strategy;
let _google_options = {
    clientID: '51369500206-8islnsqgirnsgima3823f0qqb1b00m5d.apps.googleusercontent.com',
    clientSecret: '3nZ-7iOLo1j9eXKlUGT4jA-M',
    callbackURL: "http://192.168.9.225:1300/auth/google/callback",
    passReqToCallback: true
}
const _github_options = {
    clientID: 'dee9f46667bb47a9885c',
    clientSecret: '587e91c01418e2a7731b843b907851ba7c8d4077',
    callbackURL: "http://192.168.9.225:1300/auth/github/callback"
}
//网站社交平台回调
function verify(accessToken, refreshToken, profile, done) {
    console.log('🚀🚀 进入社交平台回调 🚀🚀')
    done(null, {})
    console.log(accessToken, refreshToken, profile, done,11111)
}
const github = new GitHubStrategy(_github_options,verify);
const google = new GoogleStrategy(_google_options,verify);
const local = new LocalStrategy({},function (username, password, done){
    console.log('使用local策略')
    done(null, {})
});
passport.use(google).use(github).use(local);
/*passport.use(new LocalStrategy(
    /!**
     * @param username 用户输入的用户名
     * @param password 用户输入的密码
     * @param done 验证验证完成后的回调函数，由passport调用
     *!/
    function (username, password, done) {
        // 在编写 User.findUniqueUserByUsername 时，包含两个参数，一个是 username
        // 一个是我们现在所传入的回调函数，我们将获取到的用户信息传递给我们的回调函数
        console.log(username, password, done, 999999999)
    }
));*/



// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中（在这里
// 存到 session 中的是用户的 username）。在这里的 user 应为我们之前在 new
// LocalStrategy (fution() { ... }) 中传递到回调函数 done 的参数 user 对象（从数据// 库中获取到的）
passport.serializeUser(function (user, done) {
    // console.log('serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中')
    done(null, user);
});

// deserializeUser 在每次请求的时候将会根据用户名读取 从 session 中读取用户的全部数据
// 的对象，并将其封装到 req.user
passport.deserializeUser(function (obj, done) {
    // console.log('deserializeUser 在每次请求的时候将会根据用户名读取 从 session 中读取用户的全部数据')
    done(null, obj);
});

module.exports = {
    passport,
    github,
    google
}
