

module.exports = function (app) {
    require('./authentication')(app)
    require('../../nodejs-libs/library/routes/user_auth')(app)
    require('./user')(app)
    require('./home')(app)
}
