import { getTasks, addTask } from '../classes/records.js'

import { Router } from 'express'

export const tasksRouter = Router()

tasksRouter.get('/doGetTasks', async (req,res) => {
    let username = req.query.username

    console.log('Fetched tasks from username:',username)
    var payload;

    console.log('Getting User ' + username + ' Tasks')
    payload = await getTasks(username);

    if(payload) {
        res.json({ message: 'GET doGetTasks request received!', data: payload })
    } else {
        res.sendStatus(400);
    }
})

tasksRouter.post('/doPostNewTask', (req, res) => {
    console.log('Received POST request at /doPostTask wtih:')
    console.log(req.body)
    let data = req.body

    let username = req.headers.username

    const res = addTask(data, username);

    res.send(res)
})