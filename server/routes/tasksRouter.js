import { getTasks, addTask } from '../classes/records.js'

import { Router } from 'express'

export const tasksRouter = Router()

tasksRouter.get('/doGetTasks', async (req,res) => {
    let username = req.query.username

    console.log('Fetched tasks from username:',username)
    let response;
    response = getTasks(username);

    res.status(response.status).json(response);
})

tasksRouter.post('/doPostNewTask', (req, res) => {
    console.log('Received POST request at /doPostTask wtih:')
    console.log(req.body)
    let data = req.body

    let username = req.headers.username

    const response = addTask(data, username);

    res.status(response.status).json(response);
})