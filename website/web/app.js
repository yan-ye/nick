require('./nodejs-libs/library/config')
require('string-format').extend(String.prototype, {})
const path = require('path')
const argv = require('minimist')(process.argv.slice(2));
const os = require('os');
const localeService = require('../../libs/nodejs-libs/library/services/locale')
if(argv.h || argv.help){
    console.log('help ....')
}else if(argv.hasOwnProperty('start')){
    let port = argv.port || 8080
    $CONFIG.web_port = port;
    $CONFIG.sitemap_path = path.join(__dirname, '../sitemap')
    $CONFIG.os_hostname = os.hostname()
    switch (argv.start){
        case 'www':
            localeService.loadLang();
            $CONFIG.web_type = 'www';
            require('./www').start(port)
            break;
        case 'mobile':
            break;
        default:
            console.log(`start ----> what`)
            break
    }
}else {//测试使用
    const qs = require('qs')
    const queryString = require('querystring')
  /*  const string = 'a[b][c][d][e][f][g][h][i]=j';
    console.log(qs.parse(string,{ depth: 1 }))*/
    let str = '{0}, you have {1} unread message{2}'
    console.log('{0}, you have {1} unread message{2}'.format('11111', 222222, '3333333'))
    String.prototype.format.apply(str, ['11111',22222,333333])
}
