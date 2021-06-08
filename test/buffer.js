let buf1 = Buffer.alloc(10)
console.log(buf1)

let buf2 = Buffer.from('hello')
console.log(buf2)

let buf3 = Buffer.from('中文')
console.log(buf3, buf3.toString('utf-8'))

let buf4 = Buffer.concat([buf2, buf3])
console.log(buf4, buf4.toString('utf-8'))
