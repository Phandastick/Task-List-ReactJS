const records = require('./src/classes/records.js').default

async function createServer(){
    const express = require('express')
    const app = express()
    const port = 6969
    
    
    app.use('/api', router)




    app.listen(port)
}

createServer()