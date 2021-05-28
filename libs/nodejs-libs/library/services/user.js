const {github, passport, google} = require('../services/passport')
const user_socialModel = require('../db/user_social')
const moment = require('moment')
exports.socialWeb = function (req, res, next, provider, params, done) {
    if (params && params.access_token && provider) {
        switch (provider) {
            case 'google':
                console.log('provider ===', provider)
                google.userProfile(params.access_token, function (err, userProfile) {
                    console.log(err, userProfile)
                });
                break;
            case 'github':
                github.userProfile(params.access_token, function (err, profile) {
                    if (!err) {
                        getSocialWebV2Status(getSocialWebData(profile, params, provider), params, req, provider, done)
                    } else {
                        done('get userFile Error!', null)
                    }
                })
                break;
            default:
                done('social Error', false);
                break;
        }
    }
}


exports.socialWebCallback = function (req, res, err, user, callback) {
    if (err) {
        console.log('socialWebV2Callback Error')
        callback(err)
    } else {
        if (user) {
            let u = user //这里要处理 成需要的数据
            if (req.isAuthenticated && req.isAuthenticated()) {
                console.log('用户已登录!')
            } else {
                req.login(user, function (err) {
                    if (err) return next(err);
                    res.cookie('_ugt', u.guest_token, {
                        maxAge: 22118400000
                    });
                    console.log('用户登录成功')
                })
            }
            callback(null, 'ok')
        } else {
            callback('UNKNOWN_ERROR')
        }
    }
}

//获取web登录状态
function getSocialWebV2Status(userSocial, params, req, provider, done) {
    /**
     * {   social_token: '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',
          old_token: '',
          email: '',
          provider: 'github',
          social_id: '25119861',
          display_name: '闫野',
          avatar_url: 'https://avatars.githubusercontent.com/u/25119861?v=4'
      }
     *
     * */
    if (userSocial.social_id === params.social_id) {
        if (userSocial.social_id && userSocial.social_token && userSocial.avatar_url && userSocial.display_name && userSocial.provider) {
            if (req.isAuthenticated() && req.user) {
                //已经登录了
                console.log('已经登录了')
                done('IS_LOGGED_IN', false);
            } else {
                console.log('准备登陆中。。。。。','req.cookies._ugt', req.cookies._ugt)
                login(req, 'social', req.cookies._ugt, userSocial, done);
            }
        } else {
            console.error('socialWebV2.Error', params.access_token, provider, JSON.stringify(userSocial));
            done('INCORRECT_SOCIAL_PROFILE', false);
        }
    } else {
        console.error('socialWebV2.Error.social_id', provider);
        done('INCORRECT_SOCIAL_PROFILE', false);
    }
}

//获取web登录需要的数据
function getSocialWebData(userProfile, params, provider) {
    let userSocial = {};
    userSocial.social_token = params.access_token;
    userSocial.old_token = '';
    userSocial.email = userProfile.email || params.email || '';
    userSocial.provider = provider;
    switch (provider) {
        case 'github':
            userSocial.social_id = userProfile.id || params.social_id;
            userSocial.display_name = userProfile.displayName || params.display_name || userSocial.emai || params.social_id;
            userSocial.avatar_url = $$.__.isArray(userProfile.photos) && userProfile.photos[0].value ? userProfile.photos[0].value : params.avatar_url;
            break;
    }
    return userSocial
}

//login
const login = exports.login = function (req, req_type, guest_token, userSocial, done) {
    switch (req_type) {
        case 'social':
            loginBySocial(req, guest_token, userSocial, done)
            break;

    }
}

//社交平台登录
const loginBySocial = async function (req, guest_token, userSocial, done) {
    if (!guest_token) {
        /**
         *  social_id: {type: String, required: true},//ID
         email:String,//email
         display_name: String,//名称
         provider: String,//名称
         avatar_url: String,//图标文件ID
         *
         * */
        /* let m = new user_socialModel.modle;
         m.social_id = userSocial.social_id;
         m.email = userSocial.email;
         m.display_name = userSocial.display_name;
         m.provider = userSocial.provider;
         m.avatar_url = userSocial.avatar_url;*/
        let where = {
            social_id: userSocial.social_id
        }
        let _user = await user_socialModel.find(where, null, {}, 1)
        if (_user.length) {
            userSocial.update_date = moment().format()
            await user_socialModel.updateOne(_user[0]._id, userSocial)
            console.log('更新成功')
        } else {
            await user_socialModel.create({
                social_id: userSocial.social_id,
                email: userSocial.email,
                display_name: userSocial.display_name,
                provider: userSocial.provider,
                avatar_url: userSocial.avatar_url
            })
            console.log('保存成功')
        }
        done(null, userSocial);
    }else {
        console.log('e......')
    }

}




