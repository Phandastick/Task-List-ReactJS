import { getTasks } from '../classes/records.js'

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