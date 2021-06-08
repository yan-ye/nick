const fs = require('fs')

const rs = fs.createReadStream('./devecostudio-mac-tool-2.1.0.501.zip')
const ws = fs.createWriteStream('./02.zip')


rs.pipe(ws)
