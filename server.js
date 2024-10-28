const records = require('./src/classes/records.js').default
const express = require('express')

async function createServer(){
    const app = express()

    //logging calls
    app.use((req,res,next) => {
        console.log('Time: ', Date.now() + ",",req.method,'')
        next()
    })

    app.use((err,req,res,next) => {
        console.error(err.stack)
        res.status(500).send('Something broke! :(')
    })

    const router = express.Router()
    const port = 6969


    app.listen(port)
}

createServer()