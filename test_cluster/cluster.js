const cluster = require('cluster')
const os = require('os')
const numCpus = os.cpus().length


let workers = {};
if(cluster.isMaster) { // 主进程  也是守护进程
    cluster.on('exit', (worker, code ,signal) =>{
        console.log('工作进程 %d 关闭 (%s). 重启冲...', worker.process.pid, code || signal)
        delete workers[worker.process.pid]
        worker = cluster.fork()
        workers[worker.process.pid] = worker
    })

    for (let i =0; i < numCpus; i++){
        let worker = cluster.fork()
        workers[worker.process.pid] = worker;
    }
}else {
    const server = require('./app')
    server.listen(3000)
}

process.on('SIGTERM', function (){
    for (let pid in workers){
        process.kill(pid)
    }
    process.exit(0)
})
