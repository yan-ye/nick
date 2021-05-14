/**
 * 第三方登录
 *
 * */
const userService = require('../services/user')
const passport = require('passport')
module.exports = function (app) {
    //初始化 passport
    app.use(passport.initialize());
    app.use(passport.session());
    if ($CONFIG.web_type === 'www' || $CONFIG.web_type === 'mobile') {
        app.get('/auth/google', function (req, res) {
            res.render('firebase_login', {provider: 'google'})
        });
        app.get('/auth/github', function (req, res) {
            res.render('firebase_login', {provider: 'github'})
        });
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
        userService.socialWebV2(req,params.provider,params, function (err,user) {
            console.log(err, user, '>>>>>>')
        })
    })

    app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
    app.get('/auth/github/callback', function(req, res) {
        console.log(1111111122222, '/auth/twitter/callback')
    });

}
