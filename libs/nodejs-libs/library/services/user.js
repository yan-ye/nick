const request = require('request');
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GitHubStrategy = require('passport-github2').Strategy

let _google_options = {
    clientID: '51369500206-8islnsqgirnsgima3823f0qqb1b00m5d.apps.googleusercontent.com',
    clientSecret: '3nZ-7iOLo1j9eXKlUGT4jA-M',
    callbackURL: "http://192.168.9.225:1300/auth/google/callback",
    passReqToCallback: true
}
const _github_options = {
    clientID: 'dee9f46667bb47a9885c',
    clientSecret: 'a1a4cd98b93d8e7a51681d5f79c982d51a34b06e',
    callbackURL: "http://192.168.9.225:1300/auth/github/callback"
}
//持久化用户登录
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});
const github = new GitHubStrategy(_github_options,verify);
const google = new GoogleStrategy(_google_options,verify);
passport.use(google).use(github);


//网站社交平台回调
function verify(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile, done,11111)
    process.nextTick(function (){
        console.log(accessToken, refreshToken, profile, done,222222222222222222222)
        return done(null, 123)
    })
    return done(null, 123)
}

exports.socialWebV2 = function (req, provider, params, done) {
    if (params && params.access_token && provider) {
        switch (provider) {
            case 'google':
                console.log('provider ===', provider)
                google.userProfile(params.access_token, function (err, userProfile) {
                    console.log(err, userProfile)
                });
                break;
            case 'github':
                console.log('provider ===', provider)
              /*  github.userProfile(params.access_token, function (err, userProfile) {
                    if(!err && userProfile) {
                        getSocialWebV2Status(getSocialWebV2Data(userProfile, params, provider), params, req, provider,done)
                    }else {
                        done(err,userProfile)
                    }
                })*/
                passport.use('github', new GitHubStrategy({
                        clientID: 'dee9f46667bb47a9885c',
                        clientSecret: '587e91c01418e2a7731b843b907851ba7c8d4077',
                        callbackURL: "http://192.168.9.225:1300/auth/github/callback"
                    },
                    function(accessToken, refreshToken, profile, done) {
                        console.log(accessToken, refreshToken, profile, done)
                    }
                ));





                break;
            default:
                done('social Error', false);
                break;
        }
    }
}

exports.socialWebV2Callback = function (req,res,err,user,callback) {
    if(err) {
        console.log('socialWebV2Callback Error')
        callback(err)
    }else {
        if(user){
            let u = user //这里要处理 成需要的数据
            console.log(req.login)
            req.login(u, function (e) {
                if (e) {
                    console.error('socialCallback', e);
                    res.render('social_callback', {
                        error: $CONFIG.user_auth_error.UNKNOWN_ERROR
                    });
                } else {
                    // res.cookie('_ugt', u.guest_token, {
                    //     domain: $CONFIG.cookie_domain,
                    //     secure: $CONFIG.cookie_secure,
                    //     httpOnly: true,
                    //     maxAge: 22118400000
                    // });
                    console.log(u.guest_token,12121212)
                }
            });
        }else {
            callback('UNKNOWN_ERROR')
        }
    }
}
exports.socialCallback = function (req,res) {

}




//获取登录状态
function getSocialWebV2Status(userSocial, params, req, provider, done) {
    if(userSocial.social_id === params.social_id) {
        if(userSocial.social_id && userSocial.social_token && userSocial.avatar_url && userSocial.display_name && userSocial.provider){
            if (req.isAuthenticated() && req.user && req.user.reg_type != $CONFIG.user_reg_type.GUEST) {
                //已经登录了
                done($CONFIG.user_auth_error.IS_LOGGED_IN, false);
            } else {
                login(req, 'SOCIAL', req.cookies._ugt, null, userSocial, done)
            }
        }else{
            done('INCORRECT_SOCIAL_PROFILE', false)
        }
    }
}

//获取登录所需要的数据
function getSocialWebV2Data(userProfile,params,provider) {
    let userSocial = {};
    userSocial.social_token = params.access_token
    userSocial.old_token = '';
    userSocial.emali = userProfile.email || params.email || '';
    userSocial.provider = provider
    switch (provider) {
        case 'github':
            userSocial.social_id = userProfile.id || params.social_id;
            userSocial.display_name = userProfile.displayName || params.display_name || userSocial.emai || params.social_id;
            userSocial.avatar_url = $$.__.isArray(userProfile.photos) && userProfile.photos[0].value ? userProfile.photos[0].value : params.avatar_url;
            break;
    }
    return userSocial
}

//登录
function login (req, reg_type, guest_token, userInfo, userSocial, callback) {
    switch (reg_type){
        case 'SOCIAL':
            callback(null, userSocial)
            break;
    }
}


