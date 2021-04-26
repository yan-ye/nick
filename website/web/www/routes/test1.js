
module.exports = function (app) {
    app.use(function (req, res, next) {
        next();
    });
    app.use(function (req,res) {
        res.render('index');
    })
}
