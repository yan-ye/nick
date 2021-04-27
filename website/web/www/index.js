const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const morgan = require('morgan')
const {v4: vvidv4} = require('uuid')
const crypto = require('crypto')
const favicon = require('serve-favicon')
const redisModel = require('../nodejs-libs/library/db/redis')
let RedisStore = require('connect-redis')(session)
//输出日志
if($CONFIG.morgan_log){
    app.use(morgan('short'))
}
app.engine('.htm', require('ejs').renderFile) // 用来把 ****特定的模板**** 生成 ****html文件**** 在render的时候调用，来处理模板文件，发送给用户
app.set('views', [path.join(__dirname, 'views')])  //模板文件所在目录
app.set('view engine', '.htm')//要使用的模板引擎 模板engine使用的适配的后缀名
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, '/public/favicon.ico')))

app.use(cookieParser()) //
app.set('trust proxy', 1)
app.use(session({
    name: '_usi',
    secret: $CONFIG.session_secret,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 604800000//1周
    },
    genid: req => crypto.createHash('sha256').update(vvidv4()).update($CONFIG.session_prefix_key + $CONFIG.session_prefix_value).digest('hex'),
    store: new RedisStore({
        prefix: 'web_session:',
        client: redisModel.redis
    })
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

require('./routes')(app)


app.use(function (req,res,next){
    res.status(404).render('404')
})

exports.start = function (port) {
    app.listen(port, function () {
        console.log('ok')
    })
}


