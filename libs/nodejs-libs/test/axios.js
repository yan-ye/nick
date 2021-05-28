const axios = require('axios')

let url = 'http://192.168.9.225:1300/summoner/eune/%%faker '

axios.get(url).then(response =>{
    console.log(response.data)
}).catch(err =>{
    console.log(2222)
})
