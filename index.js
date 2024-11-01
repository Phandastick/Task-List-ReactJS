import express from 'express'
import { listsRouter } from './src/routes/listsRouter.js';

const app = express()

//server static files (react frontend)
app.use('/', express.static('./dist'));
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// app.use(listsRouter)
app.use('/api', listsRouter)

//logging calls
app.use((req,res,next) => {
    console.log('\nTime: ', Date.now() + "\n" + req.method + req.url)
    next()
})

app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send('Something broke! :(')
})

app.get('/test', (req, res) => {
    res.send('Test successful!')
})

export const PORT = process.env.PORT || 10
app.listen(PORT)