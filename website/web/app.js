require('./nodejs-libs/library/config')
require('string-format').extend(String.prototype, {})
const path = require('path')
const argv = require('minimist')(process.argv.slice(2));
const os = require('os');
const localeService = require('../../libs/nodejs-libs/library/services/locale')
if(argv.h || argv.help){
    console.log('help ....')
    console.log('base...')
    console.log('redis -p 6378')
    console.log('mongodb -v3.6.11 -p 27018')
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
/*    const qs = require('qs')
    var crypto = require('crypto')
    const queryString = require('querystring')
  /!*  const string = 'a[b][c][d][e][f][g][h][i]=j';
    console.log(qs.parse(string,{ depth: 1 }))*!/
    console.log(crypto.createHash('md5').update('21212121212').digest('hex'))*/
    /*let arr = [{aa:1}, {bb:2}]
    $$.__.map(arr,$.__.pick(''))*/
    let test_str = "{0}, you have {1} unread message{2}"
    console.log(test_str.format('111','222','33333'))
    function tt(cc) {
        console.log(cc,Array.prototype.slice.call(arguments,1),1121212)
    }
    tt('PPPPPP',2,3,4,5)
    let redisClient = require('../../libs/nodejs-libs/library/db/redis').redis
   redisClient.incrby('SIV001', 1, (err, ret) =>{
       console.log(err,ret,111111)
   })

}
