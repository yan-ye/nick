

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
