import { getDefaultLists, getUserLists, addList, getIcons } from '../classes/records.js'

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
        if(payload) {
            res.status(response.status).json(response);
        } else {
            res.sendStatus(400);
            return
        }
    } else {
        // has username
        // console.log('Getting User ' + username + ' Sidebar Lists')
        const response = getUserLists(username);
        res.status(response.status).json(response);
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

    console.log('Adding list:',name,', for account', username)

    let response = await addList(name, filename, username);
    // console.log("Response: ",response)
    res.status(response.status).json(response);
})

listsRouter.get('/doGetIcons', (req, res) => {
    const response = {}
    const icons = {}

    getIcons()
    .then((data) => {
        icons = data
    }).catch((err) => {
        console.error(err)
        response.status = 500
    })

    response.status = 200
    response.statusText = "OK"
    response.body = icons

    res.status(response.status).json(response);
})