

const mongoose = require('mongoose')
mongoose.connect('mongodb://192.168.9.225:27018/test', {}, function (err) {
    if (err) {
        console.error('connect to %s error: ', $CONFIG.db.mongodb.uri, err.message);
        process.exit(1);
    }
});
require('./user_social')

exports.user_social = mongoose.model('user_social');
console.log('init mongo done');





const Redis = require('ioredis')
const redis = exports.redis = new Redis({
    host: $CONFIG.db.redis.host,
    port: $CONFIG.db.redis.port,
    enableReadyCheck: false,
    keyPrefix: 'yanye:'
})
redis.on('error', err=> {
    console.error('connect redis error', $CONFIG.db.redis.host, err.message)
})
console.log('init redis done');
