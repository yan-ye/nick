
const controller = require('../../nodejs-libs/library/controllers/authentication')

module.exports = function (app) {
    app.use(controller.index)
}
