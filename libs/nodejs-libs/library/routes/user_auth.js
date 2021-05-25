/**
 * 第三方登录
 *
 * */
const userService = require('../services/user')
require('../services/passport')
const passport = require('passport')
module.exports = function (app) {
    //初始化 passport
    app.use(passport.initialize());
    app.use(passport.session());
    if ($CONFIG.web_type === 'www' || $CONFIG.web_type === 'mobile') {
        app.get('/auth/view/google', function (req, res) {
            res.render('firebase_login', {provider: 'google'})
        });
        app.get('/auth/view/github', function (req, res) {
            res.render('firebase_login', {provider: 'github'})
        });
        app.get('/user_:version.js', function (req,res,next) {
            res.setHeader('Content-Type', 'application/javascript')
            if(req.user){
                res.render('./inc/user_v1002', {user: req.user})
            }else{
                next()
            }

        })
    }
    app.post('/auth/verify', function (req, res, next) {
        const req_obj = req.body
        let params = {}
        params.provider = req_obj.provider || 'google'
        if(req_obj.access_token){
            params.access_token = req_obj.access_token
        }
        if(req_obj.token_secret) {
            params.token_secret = req_obj.token_secret
        }
        if(req_obj.user) {
            if (req_obj.user.id) {
                params.social_id = req_obj.user.id;
            }
            if (req_obj.user.name) {
                params.display_name = req_obj.user.name;
            }
            if (req_obj.user.imageUrl) {
                params.avatar_url = req_obj.user.imageUrl;
            }
            if (req_obj.user.email) {
                params.email = req_obj.user.email;
            }
        }
        console.error('socialWebV2.verify', JSON.stringify(params), '<<<>>>', JSON.stringify(req_obj));
        userService.socialWeb(req,res,next,params.provider,params, function (err,user) {
            userService.socialWebCallback(req,res,err,user, function (c_err,user) {
                if (c_err) {
                    res.json({error: 1})
                } else {
                    res.json({user: user})
                }
            })
        })
    })
}
function getSocialWebV2Data (userProfile, params, provider) {
    let userSocial = {};
    userSocial.social_token = params.access_token;
    userSocial.old_token = '';
    userSocial.email = userProfile.email || params.email || '';
    userSocial.provider = provider;
    switch (provider) {
        case 'twitter':
        case 'github':
        case 'facebook':
            userSocial.social_id = userProfile.id || params.social_id;
            userSocial.display_name = userProfile.displayName || params.display_name || userSocial.emai || params.social_id;
            userSocial.avatar_url = $$.__.isArray(userProfile.photos) && userProfile.photos[0].value ? userProfile.photos[0].value : params.avatar_url;
            break;
    }
    return userSocial
}
