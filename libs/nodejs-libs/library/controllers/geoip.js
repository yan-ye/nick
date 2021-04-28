
const validator = require('validator')
const geoip = require('../services/geoip')
exports.index = function (req,res,next){
    req.geo_ip = res.locals.geo_ip = $$.get_geo_ip(req)
    if(typeof req.query.xgeoip === 'string' && validator.isIP(req.query.xgeoip)){
        req.geo_ip = res.locals.geo_ip = req.query.xgeoip
    }
    if(res.locals.$_$){
        res.locals.$_$.geo_ip = req.geo_ip;
    }
    geoip.getByReqIp(req, function (info) {
        if(info){
            if(info.country){
                req.geo_country = res.locals.geo_country = info.country;
                if (res.locals.$_$) {
                    res.locals.$_$.geo_country = info.country;
                }
            }
        }
    })
    next()
}
