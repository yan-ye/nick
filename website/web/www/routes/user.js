
const controller = require('../../nodejs-libs/library/controllers/user')

module.exports = function (app) {
    app.get('/login', controller.get_login)
}
