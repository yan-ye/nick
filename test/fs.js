const fs = require('fs')

let data = fs.readFileSync('./ad_AD|*|amp_detail_auto|0.json')

// console.log(data,1111, data.toString())

/*fs.readFile('./ad_AD|*|amp_detail_auto|0.json', (err, data) =>{
    console.log(data.toString(),66666)
})*/

function f1() {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve('f1')
        }, 1000)
    })
}

function f2() {
    return new Promise(resolve => {
        resolve('f2')
        setTimeout(function () {
            resolve('f2')
        }, 1000)
    })
}

function f3() {
    return new Promise(resolve => {
        setTimeout(function () {
            resolve('f3')
        }, 1000)
    })
}

console.time('计时器')
process.nextTick(async () => {
    let a1 = await f1();
    let a2 = await f2();
    let a3 = await f3();
   /* Promise.all([f1(),f3(),f2()]).then(data => {
        console.log(data)
        console.timeEnd('计时器')
    })*/

    console.timeEnd('计时器')

})
console.log(111)


