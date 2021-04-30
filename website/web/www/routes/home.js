
module.exports = function (app) {
    app.get('/',function (req,res) {
        // console.warn(req.signedCookies.test)
        // res.setHeader('Set-cookie', 'test=test', {signed: true})
        // res.cookie('test', 'tes111111t', {signed: true});
        res.render('index');
    })
}
