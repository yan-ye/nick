/**
 * 第三方登录
 *
 * */

const passport = require('passport')
module.exports = function (app) {
    //初始化 passport
    app.use(passport.initialize());
    app.use(passport.session());
    if ($CONFIG.web_type === 'www' || $CONFIG.web_type === 'mobile') {
        app.get('/auth/google', function (req, res) {
            res.render('firebase_login', {provider: 'google'})
        });
    }
    app.post('/auth/verify', function (req, res, next) {
        const req_body = req.body
        let params = {}
        params.provider = req_body.provider || 'google'
        if(req_body.access_token){
            params.access_token = req_body.access_token
        }
        if(req_body.token_secret) {
            params.token_secret = req_body.token_secret
        }
        if(req_body.user) {
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

    })

}
