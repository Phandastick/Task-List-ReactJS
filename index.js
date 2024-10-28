import express from 'express'
import { listsRouter } from './src/routes/listsRouter.js';

const app = express()

//server static files (react frontend)
app.use('/', express.static('./dist'));
app.use(listsRouter)

//logging calls
app.use((req,res,next) => {
    console.log('Time: ', Date.now() + ",",req.method)
    next()
})

app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send('Something broke! :(')
})

app.get('/test', (req, res) => {
    res.send('Test successful')
})

export const port = process.env.PORT || 10
app.listen(port)