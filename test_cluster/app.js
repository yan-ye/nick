const http = require('http')

const server = http.createServer((request, response) =>{
    Math.random() > 0.5 ? aa() : '2'
    response.end('hello world')
});

if(!module.parent) {
    server.listen(3000)
}else {
    module.exports = server
}
