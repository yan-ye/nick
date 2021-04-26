require('./nodejs-libs/library/config')
require('string_format')
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
    const crypto = require('crypto')
    const { v4: uuidv4 } = require('uuid');
    let md5 = crypto.createHash('sha256','yanye')
    let md6 = crypto.createHash('sha256','yanye')

    console.error(md5.digest('hex'),md6.digest('hex'),uuidv4())
}
