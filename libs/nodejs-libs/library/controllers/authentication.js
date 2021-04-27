const util = require('util')

exports.index = function (req, res, next) {
    res.locals.$_$ = {
        req_url: req.url,//请求url
        req_query: req.query, //查询字符串解析出来的对象 username=zhangsan&password=123 { username:zhangsan }
        req_body: req.body, //post发送的数据解析出来的对象
        ua: req.headers['user-agent'], //用户UA
        mc_qs: '',//客户端hl,aid,flavor,cv,sv
        html_lang: '',//页面模板语言标签,
        ga_insert: false,//模板设置插入GA代码
        isIos: isIos(req)
    }
    //设置用户语言
    let ll_key = 'en';
    let __hl = req.query.hl
    if(__hl && typeof __hl === 'string' && $CONFIG.support_template_language[__hl]){
        ll_key = $CONFIG.support_template_language[__hl];
    }else if($CONFIG.route_locales_regex.test(req.url)){
        let url = $CONFIG.route_locales_regex.exec(req.url)
        if(url[1]){
            ll_key = url[1].toLowerCase()
        }
    }
    console.log('ll_key:', ll_key)

    //找到对应模板语言
    let locale = $CONFIG.support_template_locales[ll_key]

    res.locals.x_ll_test = 'test Data'
    if(locale.ll){
        res.locals.x_ll = res.locals.$_$.x_ll = '/' + locale.ll;
        res.locals.x_ll_root = res.locals.$_$.x_ll_root = '/' + locale.ll + '/';
        res.locals.x_ll_key = res.locals.$_$.x_ll_key = locale.ll;
    }else {
        res.locals.x_ll = res.locals.$_$.x_ll = '';
        res.locals.x_ll_root = res.locals.$_$.x_ll_root = '/'
        res.locals.x_ll_key = res.locals.$_$.x_ll_key = ll_key
    }
/*
    let locale = {
        order: 2,
        beta: false,
        ll: 'cn',
        tl: 'zh-CN',
        hl: 'zh-CN',
        dl: 'zh-CN',
        "country": {
            "code": "CN",
            "codes": ["CN", "TW", "HK"],
            "tending_new": 80,
            "tending": 80,
            "tending_search": 0.1,
            "extend": false,
            "flag": "cn",
            "name": "中文(简体)"
        },
        "crawler": "zh-CN",
        "crawler_short": "zh",
        "is_crawler": false,
        "date_format": {format: 'YYYY年MM月DD日', tz: 'Asia/Shanghai'},
        "html_lang": ' lang="zh-CN"'
    }
    */
    let tl = locale.tl;
    res.locals.locale_language = locale;
    res.locals.$_$.display_language = res.locals.$_$.crawler_language = locale.crawler;
    res.locals.$_$.display_language_short = locale.crawler_short;
    res.locals.$_$.template_language = tl;
    res.locals.$_$.data_language = locale.dl;
    res.locals.$_$.date_format = locale.date_format;
    res.locals.$_$.html_lang = locale.html_lang;

    let acceptsLanguages = req.acceptsLanguages()
    if(acceptsLanguages && acceptsLanguages.length > 0){
        res.locals.$_$.sourec_language = acceptsLanguages[0]
    }


    next()
}


function isIos(req) {
    let ua = req.get('User-Agent')
    return /iphone|ipod|ipad/i.test(ua.toLowerCase())
}
