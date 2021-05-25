const fs = require('fs');
const path = require('path')

exports.loadLang = function () {
    //初始化数据
    $CONFIG.support_template_language = {};
    $CONFIG.template_language = [];
    $CONFIG.text_language = {};
    //初始化多语言配置
    let lang_path = path.join(__dirname, '../../locales')
    fs.readdirSync(lang_path).filter(file => !/^\./.test(file) && file.lastIndexOf('.js')).forEach(file =>{
        let file_name = path.join(lang_path, file)
        console.log('--->', file_name)
        require(file_name)
    })
    //初始化模板语言
    for(let key in $CONFIG.support_template_language) {
        let lang = $CONFIG.support_template_language[key]
        if(!$CONFIG.template_language.includes(lang)){
            $CONFIG.template_language.push(lang)
        }
    }
    let lls = [];
    for(let key in $CONFIG.support_template_locales){
        let o = $CONFIG.support_template_locales[key]
        if(o.ll){
            lls.push(o.ll)
        }
        $CONFIG.template_locales.push(o)
    }
    //模板本地化排序
    if($CONFIG.template_locales.length > 0){
        $CONFIG.template_locales.sort((a,b) => (a.order > b.order ? 1 : -1))
    }
     // $CONFIG.template_language
    /**
     * $CONFIG.template_language [ 'en', 'cn',... ]
     * $CONFIG.template_locales [{},{},...]
     * $CONFIG.text_language = { en: {},cn: {}}
     * */
    // $CONFIG.route_locales_regex = new RegExp('^\/(' + lls.join('|') + ')(\/|$)', 'i');
    $CONFIG.route_locales_regex =  new RegExp(`^\/(${lls.join('|')})(\/|$)`,'i');
    console.log('init template language ->');
    console.log('init template locales ->');
    console.log('init route locales regex ->', $CONFIG.route_locales_regex);
}

