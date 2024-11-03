import { getDefaultLists } from '../classes/records.js'

import { Router } from 'express'

export const listsRouter = Router()
    
listsRouter.get('/doGetLists', async (req, res) => {
    
    // do check for query

    const payload = await getDefaultLists();
    
    if(payload) {
        res.json({ message: 'GET request received!', data: payload })
    } else {
        res.sendStatus(400);
    }
})