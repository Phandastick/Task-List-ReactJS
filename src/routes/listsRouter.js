import { getDefaultLists } from '../classes/records.js'

import { Router } from 'express'

export const listsRouter = Router()
    
listsRouter.get('/doGetDefaultLists', async (req, res) => {
    const payload = await getDefaultLists();
    
    if(payload) {
        res.json({ message: 'GET request received!', data: payload })
    } else {
        res.sendStatus(400);
    }
})

listsRouter.get('/doGetUserLists', async (req, res) => {
    const payload = await getUserLists();
    
    if(payload) {
        res.json({ message: 'GET request received!', data: payload })
    } else {
        res.sendStatus(400);
    }
})