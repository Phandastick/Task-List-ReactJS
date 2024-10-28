import { getDefaultLists } from '../classes/records.js'

import { Router } from 'express'

export const listsRouter = Router()

listsRouter.get('/doGetDefaultLists', async (req, res) => {
    const data = await getDefaultLists();
    res.send(data)
})