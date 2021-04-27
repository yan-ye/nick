
module.exports = function (app) {
    app.get('/test',function (req, res, next) {
        next();
    });
    app.get('/test',function (req,res) {
        // console.warn(req.signedCookies.test)
        // res.setHeader('Set-cookie', 'test=test', {signed: true})
        // res.cookie('test', 'tes111111t', {signed: true});
        res.render('index');
    })
}
