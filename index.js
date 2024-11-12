import express from 'express'
import cors from 'cors'
import { listsRouter } from './server/routes/listsRouter.js';
import { tasksRouter } from './server/routes/tasksRouter.js';

const app = express()
const BASE_URL = process.env.BASE_URL

//server static files (react frontend)
app.use('/', express.static('./public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(
    cors({
        origin:"http://localhost:5173", 
    }
));
// app.use(listsRouter)
app.use('/api', listsRouter)
app.use('/api', tasksRouter)

app.get('/', (req,res) => {
    res.sendFile('index.html');
})

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

export const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
})