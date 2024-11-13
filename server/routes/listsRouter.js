import { getDefaultLists, getUserLists, addList } from '../classes/records.js'

import { Router } from 'express'

export const listsRouter = Router()
    
listsRouter.get('/doGetLists', async (req, res) => {
    let username = req.query.username
    // console.log('Fetched username:',username)
    var payload;

    if(username === undefined){
        //default list
        // console.log('Getting Default sidebar Lists')
        payload = await getDefaultLists();
    } else {
        // has username
        // console.log('Getting User ' + username + ' Sidebar Lists')
        payload = await getUserLists(username);
    }

    
    if(payload) {
        res.json({ message: 'GET doGetList request received!', data: payload })
    } else {
        res.sendStatus(400);
    }
})

listsRouter.post('/doPostNewList', async (req,res) => {
    console.log("\nReceived POST req at /doPostNewList")
    // console.log(req.body);
    // console.log(req.headers);
    let data = req.body

    let name = data.groupname;
    let filename = data.filename;
    let username = req.headers.username;

    let newList = {
        name: name,
        filename: filename,
        username: username
    }

    console.log('Adding list:',name,', for account', username)

    let response = await addList(newList);
    console.log("Response: ",response)
    // res.sendStatus(response.status_code);
})