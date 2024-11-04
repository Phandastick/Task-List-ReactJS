import { getDefaultLists, getUserLists } from '../classes/records.js'

import { Router } from 'express'

export const listsRouter = Router()
    
listsRouter.get('/doGetLists', async (req, res) => {
    let username = req.query.username
    console.log('Fetched username:',username)
    var payload;

    if(username === undefined){
        //default list
        console.log('Getting Default Lists')
        payload = await getDefaultLists();
    } else {
        // has username
        console.log('Getting User ' + username + ' Lists')
        payload = await getUserLists(username);
    }

    
    if(payload) {
        res.json({ message: 'GET doGetList request received!', data: payload })
    } else {
        res.sendStatus(400);
    }
})