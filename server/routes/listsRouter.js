import { getDefaultLists, getUserLists, addList } from '../classes/records.js'

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

listsRouter.post('/doPostNewList', (req,res) => {
    console.log("Received POST req at /doPostNewList")
    console.log('Body is ',req.body);
    let data = req.body

    const response = addList(data);
})