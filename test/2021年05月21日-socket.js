const net = require('net')
const chatServer = net.createServer()

const clientList = []

chatServer.on('connection', client =>{
    client.write('hi\n')
    clientList.push(client)
    client.on('data', data =>{
        console.log('receive', data.toString())
        clientList.forEach(v =>{
            v.write(data)
        })
    })
})
chatServer.listen(8000)
