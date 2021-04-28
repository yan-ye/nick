
const controller = require('../../nodejs-libs/library/controllers/authentication')
const geoIpController = require('../../nodejs-libs/library/controllers/geoip')

module.exports = function (app) {
    app.use(controller.index)
    app.use(geoIpController.index)
}
