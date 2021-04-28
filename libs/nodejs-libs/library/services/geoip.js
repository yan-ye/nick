const geoip_lite = require('geoip-lite')

exports.getByReqIp = function (req, callback) {
    if (req.query.xcountry && typeof req.query.xcountry === 'string') {
        callback({country: req.query.xcountry});
    } else {
        if (req.headers['cf-ipcountry']) {
            callback({country: req.headers['cf-ipcountry']});
        } else {
            let geo = geoip_lite.lookup($$.get_geo_ip(req));
            callback(geo);
        }
    }
}

exports.getByIp = function (ip, callback) {
    let geo = geoip_lite.lookup(ip);
    callback(geo);
};
