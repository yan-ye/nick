const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
    // console.log('request', getPrototypeChain(request))
    // console.log('response', getPrototypeChain(response))
    // response.end('hello world')
    let {url, method, headers} = request
    if (url === '/' && method === 'GET') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                console.log(err)
                response.writeHead(500, {'Content-type': 'text-plain;charset=utf-8'})
                response.end('500 服务器错误')
            } else {
                response.statusCode = 200
                response.setHeader('Content-type', 'text/html;charset=utf-8')
                response.end(data)
            }

        })
    } else if (method === 'GET' && url === '/users') {
        response.writeHead(200, {'Content-type': 'application/json'})
        response.end(JSON.stringify([{name: 1111}]))
    }else if(method === 'GET' && headers.accept.indexOf('image/*') > -1) {
        fs.createReadStream('.' + url).pipe(response)
    }


}).listen(3000)

function getPrototypeChain(obj) {
    const prototypeChain = []
    while (obj = Object.getPrototypeOf(obj)) {
        prototypeChain.push(Object.getPrototypeOf(obj))
    }
    prototypeChain.push(null);
    return prototypeChain;
}
