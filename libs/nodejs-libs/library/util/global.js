
const util = require('util')
const _ = require('lodash')
const _$$ = {
    __: _,
    get_geo_ip: function (req) {
        return req.ip || req._remoteAddress || (req.connection && req.connection.remoteAddress) || undefined;
    }
}

module.exports = _$$
