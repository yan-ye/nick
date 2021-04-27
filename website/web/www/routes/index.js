

module.exports = function (app) {
    require('./authentication')(app)
    require('./test1')(app)
}
