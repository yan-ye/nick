const fs = require('fs')
const path = require('path')

fs.writeFile('/Users/apple/Documents/apkpure_v2/yanye/test/tttt.json', JSON.stringify($$.cache), function (err){
    console.log(err)
})
