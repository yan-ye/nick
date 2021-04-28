require('./base')
require('../env_config')
if($CONFIG.run_mode){
    require('../env_config')
}else{
    require('../env_config/' + $CONFIG.env_config)
}
global.$$ = require('../util/global');


