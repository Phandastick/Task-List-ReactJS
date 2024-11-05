import { getDefaultLists, getTaskLists, getUserLists } from '../classes/records.js'

import { Router } from 'express'

export const listsRouter = Router()
    
listsRouter.get('/doGetLists', async (req, res) => {
    let username = req.query.username
    console.log('Fetched username:',username)
    var payload;

    if(username === undefined){
        //default list
        console.log('Getting Default sidebar Lists')
        payload = await getDefaultLists();
    } else {
        // has username
        console.log('Getting User ' + username + ' Sidebar Lists')
        payload = await getUserLists(username);
    }

    
    if(payload) {
        res.json({ message: 'GET doGetList request received!', data: payload })
    } else {
        res.sendStatus(400);
    }
})

listsRouter.get('/doGetTaskLists', async (req,res) => {
    let username = req.query.username

    console.log('Fetched task lists from username:',username)
    var payload;

    
    console.log('Getting User ' + username + ' Tasks Lists')
    payload = await getTaskLists(username);

    if(payload) {
        res.json({ message: 'GET doGetTaskLists request received!', data: payload })
    } else {
        res.sendStatus(400);
    }
})

listsRouter.post('/doPostNewTaskList', (req,res) => {
    data = req.params
    console.log(data);

    res.send(data)
})